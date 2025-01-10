import "./App.css";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Manage from "./Admin/Manage";
import Cart from "./Components/Cart";
import Products from "./Components/Products";
import Register from "./Components/Register";
import Liptint from "./Components/Liptint";
import Profile from "./Components/Profile";
import Order from "./Components/Order";
import SharePosts from "./Components/SharePost";
import ManageProducts from "./Admin/ManageProducts";
import Services from "./Components/Services";
import UpdateProduct from "./Admin/UpdateProduct";
import Feedback from "./Admin/Feedbacks";
import AdminCartDashboard from "./Admin/AdminCarts";
// Use BrowserRouter instead of Router

function App() {
  const email = useSelector((state) => state.users.user?.email);

  return (
    <div>
      <Router>
        <Row>
          {email ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>
        <Container>
          <Routes>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/allcarts" element={<AdminCartDashboard />} />
            <Route path="/manage" element={<Manage />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/registerUser" element={<Register />} />
            <Route path="/Liptint" element={<Liptint />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/SharePost" element={<SharePosts />}></Route>
            <Route path="/posts" element={<Feedback />}></Route>
            <Route path="/managep" element={<ManageProducts />}></Route>
            <Route path="/update/:prod_id" element={<UpdateProduct />}></Route>
            <Route path="/services" element={<Services />} />
          </Routes>
        </Container>
      </Router>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Row>
        {email ? (
          <>
            <Footer />
          </>
        ) : null}
      </Row>
    </div>
  );
}

export default App;
