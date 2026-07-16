const addButton = document.getElementById("addToCart");

if (addButton) {

    addButton.addEventListener("click", function (e) {

        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const item = cart.find(product => product.name === "Патч M8L8TH");

        if(item){
            item.quantity++;
        }else{
            cart.push({
                name:"Патч M8L8TH",
                price:900,
                image:"IMG_0011.JPG",
                quantity:1
            });
        }

        localStorage.setItem("cart",JSON.stringify(cart));

        updateCartCount();
        const notification = document.getElementById("notification");

if (notification) {
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

        
    });

}

// ---------- Счетчик корзины ----------
function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item=>{
        total += item.quantity;
    });

    document.querySelectorAll(".cart-count").forEach(counter=>{
        counter.textContent = total;
    });

}

updateCartCount();


// ---------- Страница корзины ----------
const cartItems = document.getElementById("cartItems");

if(cartItems){

    renderCart();

}

function renderCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML="";

    let totalPrice = 0;

    cart.forEach((item,index)=>{

        totalPrice += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <div class="cart-price">${item.price} ₽</div>

                <div class="quantity">

                    <button onclick="minusItem(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="plusItem(${index})">+</button>

                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Удалить
                </button>

            </div>

        </div>
        `;

    });

    document.getElementById("totalPrice").textContent = totalPrice + " ₽";

    updateCartCount();

}

function plusItem(index){

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity++;

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();

}

function minusItem(index){

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart[index].quantity--;

    if(cart[index].quantity<=0){

        cart.splice(index,1);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();

}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
}
    
const checkoutButton = document.getElementById("checkoutButton");

const orderModal = document.getElementById("orderModal");
const closeModal = document.getElementById("closeModal");
const sendOrder = document.getElementById("sendOrder");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        orderModal.style.display = "flex";

    });

}

closeModal.addEventListener("click", () => {

    orderModal.style.display = "none";

});

sendOrder.addEventListener("click", function () {

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const telegram = document.getElementById("customerTelegram").value;
    const city = document.getElementById("customerCity").value;
    const comment = document.getElementById("customerComment").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let message = "🛒 Новый заказ!\n\n";

    message += "👤 Имя: " + name + "\n";
    message += "📞 Телефон: " + phone + "\n";
    message += "💬 Telegram: " + telegram + "\n";
    message += "🏙 Город: " + city + "\n";

    if(comment){
        message += "📝 Комментарий: " + comment + "\n";
    }

    message += "\n📦 Товары:\n";

    let total = 0;

    cart.forEach(item => {

        message += `${item.name}\n${item.quantity} шт. × ${item.price} ₽\n\n`;

        total += item.price * item.quantity;

    });

    message += "💰 Итого: " + total + " ₽";

    fetch("https://api.telegram.org/bot8706367967:AAGmehwgHy2MPxMcrZHlD-evPyNhGT2B__8/sendMessage", {

        method: "POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            chat_id:"1934343117",

            text:message

        })

    })

    .then(() => {

        alert("Спасибо за заказ!");

        localStorage.removeItem("cart");

        orderModal.style.display = "none";

        renderCart();

    });

});


        


   