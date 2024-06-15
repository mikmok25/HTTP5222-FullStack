function toggleImageInput() {
    const urlInput = document.getElementById('imgUrlInput');
    const uploadInput = document.getElementById('imgUploadInput');
    const urlRadio = document.getElementById('imgUrlRadio');
  
    if (urlRadio.checked) {
      urlInput.style.display = 'block';
      uploadInput.style.display = 'none';
    } else {
      urlInput.style.display = 'none';
      uploadInput.style.display = 'block';
    }
  }

function updatePrice() {
    let total = 0;
    const container = this.closest('form');
    const components = container.querySelectorAll(".component");

    components.forEach((component) => {
        const price = parseFloat(component.selectedOptions[0].getAttribute("data-price"));
        if (!isNaN(price)) {
            total += price;
        }
    });

    const totalPriceElement = container.querySelector(".totalPrice");
    const totalPriceInput = container.querySelector('input[name="totalPrice"]');
    
    totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`;
    totalPriceInput.value = total.toFixed(2); // Update hidden input value
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".component").forEach((component) => {
        component.addEventListener("change", updatePrice);
    });

    // Initial update for all modals
    document.querySelectorAll('.modal').forEach((modal) => {
        const components = modal.querySelectorAll(".component");
        let total = 0;
        components.forEach((component) => {
            const price = parseFloat(component.selectedOptions[0].getAttribute("data-price"));
            if (!isNaN(price)) {
                total += price;
            }
        });
        const totalPriceElement = modal.querySelector(".totalPrice");
        const totalPriceInput = modal.querySelector('input[name="totalPrice"]');

        totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`;
        totalPriceInput.value = total.toFixed(2); // Update hidden input value
    });

    // Initial update for the custom build form
    const customBuildForm = document.querySelector('form[action="/custom-build"]');
    if (customBuildForm) {
        const components = customBuildForm.querySelectorAll(".component");
        let total = 0;
        components.forEach((component) => {
            const price = parseFloat(component.selectedOptions[0].getAttribute("data-price"));
            if (!isNaN(price)) {
                total += price;
            }
        });
        const totalPriceElement = customBuildForm.querySelector("#totalPrice");
        const totalPriceInput = customBuildForm.querySelector('input[name="totalPrice"]');

        totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`;
        totalPriceInput.value = total.toFixed(2); // Update hidden input value
    }
});
