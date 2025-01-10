import React from "react";
import hom from "../Images/ll.jpg";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const FeaturedProducts = () => {
  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `url(${hom})`,
        }}
      >
        <h1>Unleash your potential in agriculture</h1>
        <p className="pra">
          Welcome to AgriMarketPlace, your trusted source for high-quality
          agricultural products that nourish the world. Start.
        </p>
        <div className="hero-buttons">
          {/* Update to use Link for navigation */}
          <Link to="/products">
            <button>Our Produces</button>
          </Link>
          <Link to="/services">
            <button>Our Services</button>
          </Link>
        </div>
      </section>
      <br />
      <h2> Main three benefits of our product:</h2>
      <section className="features">
        <div className="feature1">
          <h2>1</h2>
          <h3>Strategic Agricultural Solutions</h3>
          <p>
            We provide customized solutions that align with your agricultural
            goals, promoting growth and sustainability. Expert Guidance.
          </p>
        </div>
        <div className="feature2">
          <h2>2</h2>
          <h3>Expert Guidance</h3>
          <p>
            Our dedicated team offers ongoing support, ensuring your
            agricultural projects thrive and any challenges are swiftly
            resolved.
          </p>
        </div>
        <div className="feature3">
          <h2>3</h2>
          <h3>Strategic Alliances</h3>
          <p>
            Leverage our exclusive partnerships with local farmers and suppliers
            to gain a competitive advantage in the agricultural market.
          </p>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
