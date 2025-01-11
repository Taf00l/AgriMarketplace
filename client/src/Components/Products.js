import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardFooter,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Features/CartSlice";
import { getProducts } from "../Features/ProductSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Importing icons
import PupularProd from "./PupularProd";

const Products = () => {
  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({}); // Object to store quantities for each product
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Message to display in the modal

  const handleQuantityChange = (productId, value) => {
    if (value < 1) return; // Prevent setting quantity to less than 1
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1; // Default quantity is 1 if not specified
    if (!quantity) {
      alert("Quantity is required!");
    } else {
      const cartData = {
        userId: user._id,
        productId: productId,
        quantity: quantity,
      };
      dispatch(addToCart(cartData));
      setModalMessage("Item added to cart.");
      setModalOpen(true); // Open the modal when item is added
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/cart"); // Navigate to the cart page after closing the modal
  };

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    } else {
      dispatch(getProducts());
    }
  }, [user]);

  return (
    <div className="products-container" style={{ padding: "40px" }}>
      <Row>
        <h3>The most popular products :</h3>
        <PupularProd />
      </Row>
      <br></br><br></br><br></br>
      <Row>
        {products.map((product) => (
          <Col xs="12" sm="6" md="4" key={product._id} className="mb-4">
            <Card
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardImg
                top
                width="100%"
                src={product.image}
                alt={product.desc}
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <CardBody>
                <CardTitle
                  tag="h5"
                  style={{
                    color: "#333",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {product.desc}
                </CardTitle>
                <CardText
                  style={{
                    color: "#555",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {Math.round(product.price, 2)} OMR
                </CardText>
                <CardText
                  style={{
                    color: "#888",
                    fontSize: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <strong>In Stock:</strong> {product.stocks} units
                </CardText>
                <Input
                  type="number"
                  value={quantities[product._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product._id, parseInt(e.target.value))
                  }
                  min="1"
                  className="mb-3"
                  placeholder="Quantity"
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    boxShadow: "none",
                    fontSize: "14px",
                    padding: "8px",
                  }}
                />
              </CardBody>
              <CardFooter
                className="text-center"
                style={{ backgroundColor: "#fff", borderTop: "none" }}
              >
                <Button
                  color="dark"
                  onClick={() => handleAddToCart(product._id)}
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    fontWeight: "bold",
                    backgroundColor: "#333",
                    border: "none",
                  }}
                >
                  <FaShoppingCart style={{ marginRight: "8px" }} /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for item added to cart */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} centered>
        <ModalHeader
          toggle={() => setModalOpen(false)}
          className="bg-success text-white"
        >
          Success
        </ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleModalClose}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Products;
