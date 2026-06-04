function orderProduct(product){

let message =
`Hello HimShakti,

I would like to order:

Product: ${product}

Please share product details and availability.

Thank you.`;

let whatsappNumber = "918218366275";

let whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

window.open(whatsappURL,"_blank");

}