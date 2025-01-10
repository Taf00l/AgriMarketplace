import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCartItem, getCart, checkout } from "../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaCreditCard, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteCartItem(id))
        .then(() => {
          setMessage("Product has been successfully deleted from your cart.");
          setMessageType("success");
          setModalOpen(true); // افتح المودال عند الحذف
        })
        .catch(() => {
          setMessage("Error during deletion. Please try again.");
          setMessageType("danger");
          setModalOpen(true); // افتح المودال في حال فشل الحذف
        });
    }
  };

  const handleCheckout = () => {
    dispatch(checkout(user._id))
      .then(() => {
        setMessage("Checkout successful! Your order has been placed.");
        setMessageType("success");
        setModalOpen(true);
        setIsCheckoutCompleted(true);
      })
      .catch(() => {
        setMessage("Error during checkout. Please try again.");
        setMessageType("danger");
        setModalOpen(true);
        setIsCheckoutCompleted(false);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (isCheckoutCompleted) {
      navigate("/products");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getCart(user._id));
    }
  }, [user]);

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="cart-container text-center py-5">
        <h1 className="display-6">
          <FaShoppingCart className="me-2" />
          Your Shopping Cart
        </h1>
        <p className="text-muted">
          Your cart is empty. Please add items to the cart.
        </p>
      </Container>
    );
  }

  return (
    <Container className="cart-container py-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg rounded">
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-4 text-uppercase">
                <FaShoppingCart className="me-2" />
                Your Shopping Cart
              </CardTitle>
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 pb-3 border-bottom"
                >
                  <div className="d-flex align-items-center w-100">
                    <img
                      src={item.image}
                      alt={item.desc}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginRight: "20px",
                      }}
                    />
                    <div className="w-100">
                      <h6
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginBottom: "10px",
                        }}
                      >
                        {item.desc}
                      </h6>
                      <CardText
                        className="text-muted mb-1"
                        style={{ fontSize: "14px" }}
                      >
                        Quantity: {item.quantity}
                      </CardText>
                      <CardText
                        className="text-muted mb-1"
                        style={{ fontSize: "14px" }}
                      >
                        Price: {item.price.toFixed(2)} OMR
                      </CardText>
                    </div>
                  </div>

                  {/* زر الحذف مع التعديل على مظهره */}
                  <Button
                    color="danger"
                    className="btn-sm rounded-pill shadow mt-3 mt-md-0"
                    onClick={() => handleDelete(item._id)}
                    style={{
                      border: "none",
                      backgroundColor: "#dc3545",
                      fontSize: "14px",
                      padding: "8px 15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaTrashAlt className="me-2" /> Delete
                  </Button>
                </div>
              ))}
            </CardBody>
            <div
              className="py-4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
                borderTop: "1px solid #ddd",
              }}
            >
              <h5
                style={{
                  fontWeight: "bold",

                  marginBottom: "15px",
                }}
              >
                Total Price: {cart.totalPrice.toFixed(2)} OMR
              </h5>
              <Button
                color="primary"
                size="lg"
                className="checkout-button rounded-pill shadow-lg"
                onClick={handleCheckout}
              >
                <FaCreditCard className="me-2" />
                Checkout
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader
          toggle={toggleModal}
          className={`text-white ${
            messageType === "success" ? "bg-success" : "bg-danger"
          }`}
        >
          {messageType === "success" ? "Success" : "Error"}
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Cart;
