
let cart = [];
let quantities = {};

function addToCart(name,price){

    let item =
    cart.find(product =>
    product.name === name);

    if(item){

        item.quantity++;

    }else{

        cart.push({
            name:name,
            price:price,
            quantity:1
        });
    }

    displayCart();
}
function increaseQtyCard(name,price){

    if(!quantities[name]){

        quantities[name] = 1;

        document.getElementById(
        `add-${name}`
        ).style.display = "none";

        document.getElementById(
        `box-${name}`
        ).style.display = "flex";

    }else{

        quantities[name]++;
    }

    document.getElementById(
    `qty-${name}`
    ).innerText =
    quantities[name];

    addToCart(name,price);
}
function decreaseQtyCard(name){

    if(!quantities[name]) return;

    quantities[name]--;

    let item =
    cart.find(product =>
    product.name === name);

    if(item){

        item.quantity--;

        if(item.quantity <= 0){

            cart =
            cart.filter(product =>
            product.name !== name);
        }
    }

    if(quantities[name] <= 0){

        quantities[name] = 0;

        document.getElementById(
        `box-${name}`
        ).style.display = "none";

        document.getElementById(
        `add-${name}`
        ).style.display = "block";
    }

    document.getElementById(
    `qty-${name}`
    ).innerText =
    quantities[name];

    displayCart();
}
function displayCart(){

    let cartContainer =
    document.getElementById("cart-items");

    let total = 0;

    if(cart.length === 0){

        cartContainer.innerHTML =
        "<p>Cart is empty</p>";

        document.getElementById("total-price")
        .innerText = "Total: ₹0";

        return;
    }

    cartContainer.innerHTML = "";

    cart.forEach((item,index)=>{

        let itemTotal =
        item.price * item.quantity;

        total += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>
                ₹${item.price}
                ×
                ${item.quantity}
                =
                ₹${itemTotal}
            </p>

            <button
            onclick="removeItem(${index})">
            Remove
            </button>

        </div>

        `;
    });

    document.getElementById("total-price")
    .innerText =
    `Total: ₹${total}`;
    let totalItems = 0;

cart.forEach(item=>{
    totalItems += item.quantity;
});

document.getElementById(
"cart-count"
).innerText =
`🛒 ${totalItems} Items`;
}

function removeItem(index){

    cart.splice(index,1);

    displayCart();
}

function orderProduct(product){

    let message =
    `Hello HimShakti,

I would like to order:

${product}`;

    let url =
    `https://wa.me/918218366275?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");
}

function checkoutWhatsApp(){

    if(cart.length === 0){

        alert("Cart is empty");
        return;
    }

    let total = 0;

    let message =
    "Hello HimShakti,%0A%0AI would like to order:%0A%0A";

    cart.forEach(item=>{

        let itemTotal =
        item.price * item.quantity;

        total += itemTotal;

        message +=
        `• ${item.name} x ${item.quantity} = ₹${itemTotal}%0A`;
    });

    message +=
    `%0A--------------------%0A`;

    message +=
    `Total Amount: ₹${total}`;

    window.open(
    `https://wa.me/918218366275?text=${message}`,
    "_blank");
}