
const addButton = document.getElementById("addToCart");

// Добавление товара
if (addButton) {
    addButton.addEventListener("click", function (e) {
        e.preventDefault();

        const product = {
            name: "Патч M8L8TH",
            price: 900,
            image: "IMG_0011.JPG"
        };

        localStorage.setItem("cart", JSON.stringify(product));
const counter = document.querySelector(".cart-count");

if (counter) {
    counter.textContent = "1";
}
        alert("✅ Товар добавлен в корзину!");
    });
}

// Отображение товара в корзине
const cartItems = document.getElementById("cartItems");

if (cartItems) {

    const product = JSON.parse(localStorage.getItem("cart"));

    if (product) {

        cartItems.innerHTML = `
            <div class="card">
                <img src="${product.image}">
                <h2>${product.name}</h2>
                <p class="price">${product.price} ₽</p>
            </div>
        `;

    } else {

        cartItems.innerHTML = `
            <h2>Корзина пуста</h2>
            <p>Добавьте товар из каталога.</p>
        `;

    }

}