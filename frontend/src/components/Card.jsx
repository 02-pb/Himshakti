import React from "react";

export default function Card({
  title,
  image,
  price,
  quantity,
  onIncrease,
  onDecrease,
}) {
  const total = quantity * price;

  const orderSingle = () => {
    const msg = `Hello PahadiKart,

I want to order:
• ${title}
• Price: ₹${price}
• Quantity: ${quantity}
• Total: ₹${total}`;

    window.open(
      `https://wa.me/918218366275?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>

      <p className="price">₹{price}</p>

      {quantity === 0 ? (
        <button onClick={onIncrease}>Add to Cart</button>
      ) : (
        <>
          <div className="quantity-controls">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
          </div>

          <p className="order-summary">
            Items: {quantity} | Total: ₹{total}
          </p>

          <button className="whatsapp-btn" onClick={orderSingle}>
            Order on WhatsApp
          </button>
        </>
      )}
    </div>
  );
}