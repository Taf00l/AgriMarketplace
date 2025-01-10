import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import logo from "../Images/logo.jpg";
import logn from "../Images/logi1.png";
import { useDispatch } from "react-redux";
import { login } from "../Features/UserSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const handleLogin = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال النموذج
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    } else if (isSuccess) {
      if (user && user.userType === "user") {
        console.log("test");
        navigate("/");
      } else {
        navigate("/Manage"); // إذا كان المستخدم من النوع الإداري
        navigate("/posts"); // يتم التنقل إلى صفحة البوستات
      }
    }
  }, [user, isError, isSuccess, navigate]);

  return (
    <Container className="login-container">
      <Row>
        <Col md={6} className="login-form">
          <div className="register-r">
            <img src={logo} className="logo_register" alt="Logo" />
          </div>
          <h2 className="display-6 logtitle">Login</h2>

          <Form>
            <FormGroup>
              <Label for="email">Enter Your Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Enter Your Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button
              onClick={(e) => handleLogin(e)} // تمرير الحدث بشكل صحيح
              className="login-btn"
            >
              Login Now
            </Button>
          </Form>
          <p className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
          <p className="create-account">
            New user? <Link to="/registerUser">Create account</Link>
          </p>
        </Col>

        <Col md={6} className="login-image">
          <img
            src={logn}
            alt="Lipstick Product"
            className="login-image__content"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
