const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");

// load the environment variables from .env file
dotenv.config();

const db = require("./db");

// Setup the express app
const app = express();
const port = process.env.PORT || 3000;

// Setup application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the send "views" is the folder name
app.set("view engine", "pug");

// Setup folder for static files
app.use(express.static("public"));

//Setup body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Ensure upload directory exists
const fs = require("fs");
const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// USE PAGE ROUTES FROM ROUTER(S)

app.get("/", async (request, response) => {
  let productList = await db.getProducts();

  if (!productList.length) {
    await db.initializeProducts();
    productList = await db.getProducts();
  }

  response.render("index", { products: productList });
});

app.get("/add-product", async (request, response) => {
  response.render("add");
});

app.post("/add", upload.single("imgUrl"), async (request, response) => {
  const { name, category, brand, specifications, price, imgSource, imgUrl } =
    request.body;
  let imageUrl = imgUrl;

  if (imgSource === "upload" && request.file) {
    imageUrl = `uploads/${request.file.filename}`;
  }

  try {
    await db.addProduct(name, category, brand, specifications, price, imageUrl);
    response.redirect("/");
  } catch (error) {
    console.log("Failed to add product", error);
    response.status(500).send("Failed to add product");
  }
});

app.post("/update", upload.single("imgUrl"), async (request, response) => {
  const { id, name, category, brand, specifications, price, imgSource, imgUrl } = request.body;
  let imageUrl = imgUrl;

  if (imgSource === "upload" && request.file) {
    imageUrl = `uploads/${request.file.filename}`;
  }

  try {
    await db.updateProduct(id, {
      name,
      category,
      brand,
      specifications,
      price,
      imgUrl: imageUrl,
    });
    response.redirect("/");
  } catch (error) {
    console.error("Failed to update product", error);
    response.status(500).send("Failed to update product");
  }
});

app.post("/delete", async (request, response) => {
  const { id } = request.body;

  try {
    await db.deleteProductById(id);
    response.redirect("/");
  } catch (error) {
    console.error("Failed to delete product", error);
    response.status(500).send("Failed to delete product");
  }
});

app.get("/custom-build", async (request, response) => {
  let productList = await db.getProducts();
  response.render("custom-build", { products: productList });
});

app.post("/custom-build", async (request, response) => {
  const { cpu, gpu, ram, ssd, buildName, description } = request.body;

  try {
    totalPrice = 0;
    const products = await db.getProducts();
    products.forEach((product) => {
      if (
        product._id == cpu ||
        product._id == gpu ||
        product._id == ram ||
        product._id == ssd
      ) {
        totalPrice += product.price;
      }
    });
    await db.createCustomBuild(cpu, gpu, ram, ssd, buildName, description, totalPrice);
    response.redirect("/builds");
  } catch (error) {
    console.error("Failed to create custom build", error);
    response.status(500).send("Failed to create custom build");
  }
});

app.get("/builds", async (request, response) => {
  const builds = await db.getCustomBuilds();
  const productList = await db.getProducts();

  response.render("builds", { builds, products: productList });
});

app.post("/update-build", async (request, response) => {
  const { id, cpu, gpu, ram, ssd, buildName, description, totalPrice } = request.body;
  try {
    await db.updateCustomBuild(id, { cpu, gpu, ram, ssd, buildName, description, totalPrice });
    response.redirect("/builds");
  } catch (error) {
    console.log("Failed to update custom build", error);
    response.status(500).send("Failed to update custom build");
  }
});

app.post("/delete-build", async (request, response) => {
  const { id } = request.body;
  try {
    await db.deleteCustomBuild(id);
    response.redirect("/builds");
  } catch (error) {
    console.log("Failed to delete build", error);
    response.status(500).send("Failed to delete build");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
