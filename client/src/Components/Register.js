import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { registerUser } from "../Features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const userList = useSelector((state) => state.users.value);
  //Create the state variables
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState();
  const [birthday, setbirthday] = useState();
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [modal, setModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  // Handle form submission
  const onSubmit = (data) => {
    const { name, email, phoneNumber, birthday, password, confirmPassword } =
      data;

    // Simulate checking if email already exists (you may check in redux store or server)
    const isEmailExist = false; // Replace this with actual check from your state or backend
    if (isEmailExist) {
      setAlertMessage("Email already exists. Please use a different email.");
      setAlertType("danger");
      setModal(true); // Open the modal
      return;
    }
    // User data
    const userData = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      birthday: birthday,
      password: password,
    };

    try {
      dispatch(registerUser(userData)); // Dispatch action to add user
      // Set success message
      setAlertMessage("Registration successful! Please log in.");
      setAlertType("success");

      // Open modal
      setModal(true);

      // Log success
      console.log("Success! User registered successfully.");

      // Redirect to login page after success
      setTimeout(() => {
        setModal(false); // Close modal after 3 seconds
        navigate("/");
      }, 3000);
    } catch (error) {
      // Set error message
      setAlertMessage(
        "There was an error processing your registration. Please try again."
      );
      setAlertType("danger");
      setModal(true); // Open the modal

      // Log error
      console.error("Error:", error);
    }
  }; // Toggle modal
  const toggle = () => setModal(!modal);

  return (
    <div className="register-container">
      <h2>Register</h2>

      {/* Modal for Success/Error messages */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {alertType === "success" ? "Success" : "Error"}
        </ModalHeader>
        <ModalBody>{alertMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" {...register("name")} />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            {...register("phoneNumber")}
          />
          <p className="error">{errors.phoneNumber?.message}</p>
        </div>

        <div className="form-group">
          <label>Birthday</label>
          <input
            type="date"
            className="form-control"
            {...register("birthday")}
          />
          <p className="error">{errors.birthday?.message}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword")}
          />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>

        <Button type="submit" color="dark">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
