import * as yup from "yup";

// Product Schema with Custom Validation Messages
export const productSchemaValidation = yup.object().shape({
  pcode: yup
    .string()
    .typeError("Product name must be at least 4 characters long") // Custom type error for number
    .required("Product name is required"),
  desc: yup
    .string()
    .min(4, "Description must be at least 4 characters long")
    .required("Description is required"),
  image: yup.string().required("Image URL is required"),
  price: yup
    .number()
    .typeError("Price must be a valid number") // Custom type error for number
    .required("Price is required"),
  stocks: yup.number().typeError("Stocks must be a valid number"), // Custom type error for number
});
