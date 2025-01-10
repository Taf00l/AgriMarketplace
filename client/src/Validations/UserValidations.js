import * as yup from "yup";

// Validation schema
export const userSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{8}$/, "Phone number must be 8 digits")
    .required("Phone number is required"),

  birthday: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),

  password: yup.string().min(4).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required(),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});
