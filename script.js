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

   