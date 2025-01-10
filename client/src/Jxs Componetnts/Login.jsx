import React, { useState } from "react";
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
import img from "../Images/logi1.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Features/UserSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Retrieve the current value of the state from the store, name of state is users with a property user
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [user, isError, isSuccess]);

  return (
    <Container className="login-container">
      <Row>
        <Col md={6} className="login-form">
          <div className="register-r">
            <img src={logo} className="logo_register"></img>
          </div>
          <h2 className="display-6 logtitle">Login</h2>

          <p className="login-description">
            Welcome Back! Please enter your credentials to access your account.
          </p>

          <Form onSubmit={handleLogin}>
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
              type="button"
              onClick={() => handleLogin()}
              color="dark"
              className="login-btn"
            >
              Login Now
            </Button>
          </Form>
          <p className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
          <p className="create-account">
            New user? <a href="/register">Create account</a>
          </p>
        </Col>

        <Col md={6} className="login-image">
          <img
            src={img} // استبدل هذه الصورة بالصورة الفعلية الخاصة بك
            alt="Lipstick Product"
            className="login-image__content"
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
