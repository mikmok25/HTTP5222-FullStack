const mongoose = require("mongoose");

const dbUrl = process.env.MONGODB_URI;

const productScheme = new mongoose.Schema({
  name: String,
  category: String,
  brand: String,
  specifications: String,
  price: Number,
  imgUrl: String,
});

const Product = mongoose.model("Product", productScheme);

const customBuild = new mongoose.Schema({
  cpu: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  gpu: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  ram: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  ssd: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  buildName: String,
  description: String,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const CustomBuild = mongoose.model("CustomBuild", customBuild);

async function connect() {
  try {
    await mongoose.connect(dbUrl);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

async function getProducts() {
  await connect();
  return await Product.find({});
}
async function getCustomBuilds() {
  await connect();
  return await CustomBuild.find({}).populate("cpu gpu ram ssd");
}

async function updateCustomBuild(id, updates) {
    await connect();
    await CustomBuild.findByIdAndUpdate(id, updates);
  }

async function initializeProducts() {
  await connect();
  try {
    const result = await Product.insertMany([
      {
        name: "Intel Core i7",
        category: "CPU",
        brand: "Intel",
        specifications: "Core i7, 3.6GHz",
        price: 300,
        imgUrl:
          "https://ccimg.canadacomputers.com/Products/600x600/240/384/201281/84702.jpg",
      },
      {
        name: "NVIDIA RTX 3080",
        category: "GPU",
        brand: "NVIDIA",
        specifications: "10GB, GDDR6X",
        price: 800,
        imgUrl:
          "https://m.media-amazon.com/images/I/61juKdIql1L._AC_SX679_.jpg",
      },
      {
        name: "Corsair Vengeance LPX 16GB",
        category: "RAM",
        brand: "Corsair",
        specifications: "16GB DDR4, 3200MHz",
        price: 100,
        imgUrl:
          "https://m.media-amazon.com/images/I/51gLnYN1W7L._AC_SL1100_.jpg",
      },
    ]);

    console.log("Insert result:", result);
  } catch (error) {
    console.log("Error initializing products:", error);
  }
}

async function addProduct(
  name,
  category,
  brand,
  specifications,
  price,
  imgUrl
) {
  await connect();
  await Product.create({
    name,
    category,
    brand,
    specifications,
    price,
    imgUrl,
  });
}

async function createCustomBuild(cpu, gpu, ram, ssd, buildName, description, totalPrice) {
  await connect();
  await CustomBuild.create({
    cpu,
    gpu,
    ram,
    ssd,
    buildName,
    description,
    totalPrice,
  });
}

async function updateProduct(id, newProduct) {
  await connect();
  await Product.findByIdAndUpdate(id, newProduct);
}


async function deleteProductById(id) {
  await connect();
  await Product.findByIdAndDelete(id);
}

async function deleteCustomBuild(id) {
    await connect();
    await CustomBuild.findByIdAndDelete(id);
  }
module.exports = {
  getProducts,
  initializeProducts,
  addProduct,
  deleteProductById,
  updateProduct,
  createCustomBuild,
  getCustomBuilds,
  updateCustomBuild,
  deleteCustomBuild,
};
