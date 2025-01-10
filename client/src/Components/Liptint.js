import React from "react";
import cherry from "../Images/cherry.png";
import watermelon from "../Images/Watermelon.jpg";
import strawberry from "../Images/strawberry.jpg";
import liptinit from "../Images/logi.jpg";
import { Button } from "reactstrap";
import "../App.css"; // استيراد CSS مخصص

const Liptint = () => {
  const products = [
    { id: 1, name: "Cherry Tint", price: 2.5, image: cherry },
    { id: 2, name: "Strawberry Tint", price: 2.5, image: strawberry },
    { id: 3, name: "Watermelon Tint", price: 2.5, image: watermelon },
  ];

  return (
    <div className="liptint-container">
      {/* صورة تعريف */}
      <div className="hero-section">
        <img src={liptinit} alt="Hero" className="hero-image" />
        <h1 className="hero-text">Discover Our Liptint Collection</h1>
      </div>

      {/* العنوان الرئيسي */}
      <h1 className="liptint-title">Liptint Products</h1>

      {/* المنتجات */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Price: {product.price} OMR</p>
            <Button color="dark" outline className="order-button">
              Order Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Liptint;
