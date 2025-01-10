import React, { useEffect, useState } from "react";
import "./home.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { getCart } from "../Features/CartSlice";
import { logout } from "../Features/UserSlice";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import Logo from "../Images/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import "../App.css"; // Custom CSS
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaTags,
  FaUsersCog,
  FaCommentDots,
  FaShoppingCart,
  FaEdit,
  FaInfoCircle,
} from "react-icons/fa";

function Header() {
  const user = useSelector((state) => state.users.user) || {};
  const cart = useSelector((state) => state.cart);
  const [logoutModal, setLogoutModal] = useState(false);
  const toggleLogoutModal = () => setLogoutModal(!logoutModal);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    } else {
      dispatch(getCart(user._id));
    }
  }, [user, navigate, dispatch]);

  return (
    <div>
      <Navbar
        className="header"
        style={{
          top: 0,
          width: "100%",
          backgroundColor: "#276e39", // Dark Green
        }}
      >
        <NavbarBrand tag={Link} to="/" className="me-auto">
          <img src={Logo} alt="Logo" className="logo-img" />
        </NavbarBrand>
        <Nav
          className="me-auto"
          style={{ display: "flex", alignItems: "center" }}
        >
          <NavItem
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <Link to="/" className="nav-link">
              <FaHome className="me-2" /> Home
            </Link>
          </NavItem>
          {user?.userType === "admin" && (
            <>
              <NavItem
                className={`nav-item ${
                  location.pathname === "/Manage" ? "active" : ""
                }`}
              >
                <Link to="/Manage" className="nav-link">
                  Manage Users
                </Link>
              </NavItem>
              <NavItem
                className={`nav-item ${
                  location.pathname === "/posts" ? "active" : ""
                }`}
              >
                <Link to="/posts" className="nav-link">
                  Customer Reviews
                </Link>
              </NavItem>
              <NavItem
                className={`nav-item ${
                  location.pathname === "/allcarts" ? "active" : ""
                }`}
              >
                <Link to="/allcarts" className="nav-link">
                  Carts {cart.count}
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link to="/managep" className="nav-link">
                  Manage Products
                </Link>
              </NavItem>
            </>
          )}
          <NavItem
            className={`nav-item ${
              location.pathname === "/products" ? "active" : ""
            }`}
          >
            <Link to="/products" className="nav-link">
              <FaBoxOpen className="me-2" /> Products
            </Link>
          </NavItem>
          <NavItem
            className={`nav-item ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            <Link to="/profile" className="nav-link">
              <FaUser className="me-2" /> Profile Settings
            </Link>
          </NavItem>

          <NavItem
            className={`nav-item ${
              location.pathname === "/cart" ? "active" : ""
            }`}
          >
            <Link to="/cart" className="nav-link">
              <FaShoppingCart className="me-2" /> Shopping Cart
            </Link>
          </NavItem>
          <NavItem
            className={`nav-item ${
              location.pathname === "/SharePost" ? "active" : ""
            }`}
          >
            <Link to="/SharePost" className="nav-link">
              <FaEdit className="me-2" /> Your Feedback
            </Link>
          </NavItem>
          <NavItem
            className={`nav-item ${
              location.pathname === "/About" ? "active" : ""
            }`}
          >
            <Link to="/About" className="nav-link">
              <FaInfoCircle className="me-2" /> About Us
            </Link>
          </NavItem>
          <NavItem className="nav-item">
            <Button
              onClick={toggleLogoutModal}
              color="dark"
              className="logout-button w-100 text-start"
              style={{
                borderRadius: "5px",
                padding: "10px",
                marginLeft: "10px",
              }}
            >
              <FaSignOutAlt className="me-2" /> Log Out
            </Button>
          </NavItem>
        </Nav>
      </Navbar>

      <Modal isOpen={logoutModal} toggle={toggleLogoutModal} centered>
        <ModalHeader
          toggle={toggleLogoutModal}
          style={{
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          Confirm Logout
        </ModalHeader>
        <ModalBody style={{ textAlign: "center", color: "#000" }}>
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleLogoutModal}>Cancel</Button>
          <Button onClick={handleLogout}>Log Out</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Header;
