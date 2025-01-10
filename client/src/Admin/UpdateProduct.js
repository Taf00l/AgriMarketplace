import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { useState } from "react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../Features/ProductSlice";
import { productSchemaValidation } from "../Validations/ProductValidations";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const products = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { prod_id } = useParams();

  // Function to search for a product by ID
  const findProductById = (prod_id) => {
    return products.find((product) => product._id == prod_id);
  };

  const productToUpdate = findProductById(prod_id);

  const [pcode, setPcode] = useState(productToUpdate.pcode);
  const [desc, setDesc] = useState(productToUpdate.desc);
  const [price, setPrice] = useState(productToUpdate.price);
  const [image, setImage] = useState(productToUpdate.image);
  const [stocks, setStocks] = useState(productToUpdate.stocks);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      let tax = 0;
      if (data.price >= 20 && data.price <= 50) {
        tax = data.price * 0.1;
      } else if (data.price > 50 && data.price <= 100) {
        tax = data.price * 0.2;
      } else if (data.price > 100) {
        tax = data.price * 0.5;
      } else {
        tax = 0;
      }

      const productData = {
        pcode: data.pcode,
        desc: data.desc,
        price: data.price + tax,
        image: data.image,
        stocks: data.stocks,
      };

      dispatch(updateProduct({ productData, prod_id }));

      // Show confirmation message
      setShowConfirmation(true);

      // After a few seconds, navigate to the products management page
      setTimeout(() => {
        navigate("/managep");
      }, 3000); // 3 seconds delay for the user to see the confirmation message
    } catch (error) {
      console.log("Error.");
    }
  };

  return (
    <Container
      fluid
      style={{
        padding: "40px 20px",
        minHeight: "100vh",
      }}
    >
      <Row>
        <Col md={12} className="text-center mb-5">
          <h2
            style={{
              color: "#212121",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Update Product
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            {showConfirmation && (
              <Alert color="success" className="text-center mb-4">
                Product Updated Successfully!
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Product Code */}
              <div className="form-group mb-4">
                <input
                  className="form-control"
                  placeholder="Product Code..."
                  value={pcode}
                  {...register("pcode", {
                    onChange: (e) => setPcode(e.target.value),
                  })}
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "8px",
                    boxShadow: "none",
                  }}
                />
                <p className="error text-danger">{errors.pcode?.message}</p>
              </div>

              {/* Product Description */}
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Description..."
                  value={desc}
                  {...register("desc", {
                    onChange: (e) => setDesc(e.target.value),
                  })}
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "8px",
                    boxShadow: "none",
                  }}
                />
                <p className="error text-danger">{errors.desc?.message}</p>
              </div>

              {/* Price */}
              <div className="form-group mb-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price..."
                  value={price}
                  {...register("price", {
                    onChange: (e) => setPrice(e.target.value),
                  })}
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "8px",
                    boxShadow: "none",
                  }}
                />
                <p className="error text-danger">{errors.price?.message}</p>
              </div>

              {/* Product Image */}
              <div className="form-group mb-4">
                <div className="text-center mb-3">
                  {image && (
                    <img
                      src={image}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </div>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL..."
                  value={image}
                  {...register("image", {
                    onChange: (e) => setImage(e.target.value),
                  })}
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "8px",
                    boxShadow: "none",
                  }}
                />
                <p className="error text-danger">{errors.image?.message}</p>
              </div>

              {/* Stocks */}
              <div className="form-group mb-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of Stocks..."
                  value={stocks}
                  {...register("stocks", {
                    onChange: (e) => setStocks(e.target.value),
                  })}
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "8px",
                    boxShadow: "none",
                  }}
                />
                <p className="error text-danger">{errors.stocks?.message}</p>
              </div>

              <Button
                color="primary"
                type="submit"
                style={{
                  backgroundColor: "#212121",
                  borderColor: "#212121",
                  color: "#fff",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Save Changes
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProduct;
