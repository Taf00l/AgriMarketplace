import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../Features/ProductSlice";
import { productSchemaValidation } from "../Validations/ProductValidations";
import { Link, useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const user = useSelector((state) => state.users.user);
  const products = useSelector((state) => state.products.allProducts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create state variables
  const [pcode, setPcode] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [stocks, setStocks] = useState(0);

  // For form validation using react-hook-form

  // State for modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchemaValidation),
  });

  // Handle form submission
  const onSubmit = (data) => {
    let tax = 0;
    if (data.price >= 200 && data.price <= 500) {
      tax = data.price * 0.1;
    } else if (data.price > 501 && data.price <= 1000) {
      tax = data.price * 0.2;
    } else if (data.price > 1000) {
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
    dispatch(addProduct(productData)); // إضافة المنتج
    setAddModal(true); // عرض نافذة التأكيد
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setDeleteModal(true); // Show confirmation modal for delete
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(productToDelete));
    setDeleteModal(false); // Close modal after deleting
  };

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    } else {
      dispatch(getProducts());
    }
  }, [user, dispatch, navigate]);

  console.log(products); // لتفحص البيانات

  return (
    <Container fluid style={{ padding: "40px 20px" }}>
      <Row className="mb-5">
        <Col md={12} className="text-center">
          <p className="display-4" style={{ color: "#333" }}>
            Admin Dashboard - Product Management
          </p>
        </Col>
      </Row>
      <Row>
        {/* Column for Add Product */}
        <Col md={4} xs={12}>
          <h4 style={{ color: "#333", fontWeight: "bold" }}>Add New Product</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Product Code..."
                {...register("pcode", {
                  onChange: (e) => setPcode(e.target.value),
                })}
                style={{
                  marginBottom: "15px",
                  borderColor: "#aaa",
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
              />
              <p className="error" style={{ color: "#dc3545" }}>
                {errors.pcode?.message}
              </p>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Product Description..."
                {...register("desc", {
                  onChange: (e) => setDesc(e.target.value),
                })}
                style={{
                  marginBottom: "15px",
                  borderColor: "#aaa",
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
              />
              <p className="error" style={{ color: "#dc3545" }}>
                {errors.desc?.message}
              </p>
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Price..."
                {...register("price", {
                  onChange: (e) => setPrice(e.target.value),
                })}
                style={{
                  marginBottom: "15px",
                  borderColor: "#aaa",
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
              />
              <p className="error" style={{ color: "#dc3545" }}>
                {errors.price?.message}
              </p>
            </div>
            <div className="form-group">
              <input
                type="url"
                className="form-control"
                placeholder="Image URL..."
                {...register("image", {
                  onChange: (e) => setImage(e.target.value),
                })}
                style={{
                  marginBottom: "15px",
                  borderColor: "#aaa",
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
              />
              <p className="error" style={{ color: "#dc3545" }}>
                {errors.image?.message}
              </p>
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Number of stocks..."
                {...register("stocks", {
                  onChange: (e) => setStocks(e.target.value),
                })}
                style={{
                  marginBottom: "20px",
                  borderColor: "#aaa",
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
              />
              <p className="error" style={{ color: "#dc3545" }}>
                {errors.stocks?.message}
              </p>
            </div>
            <Button
              color="primary"
              className="w-100"
              type="submit"
              style={{
                backgroundColor: "#212121",
                borderColor: "#212121",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Save Product
            </Button>
            <Button
              color="secondary"
              className="w-100 mt-3"
              type="reset"
              // هذا لا يحتاج إلى reset في هذا السياق
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Clear
            </Button>
          </form>
        </Col>

        {/* Column for Displaying Products in a Table */}
        <Col md={8} xs={12}>
          <h4 style={{ color: "#333", fontWeight: "bold" }}>Manage Products</h4>
          <Table
            hover
            responsive
            style={{
              borderRadius: "30px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // تأثير الظلال

              color: "#fff", // النصوص باللون الأبيض
            }}
          >
            <thead
              style={{
                color: "#fff", // نص أبيض
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <tr>
                <th>Product Code</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ textAlign: "center" }}>
                  <td>{product.pcode}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.desc}
                      style={{
                        width: "90px", // عرض ثابت للصورة
                        height: "90px", // ارتفاع ثابت للصورة
                        objectFit: "cover", // تأكد من تغطية المساحة بشكل جيد
                        borderRadius: "8px", // زاوية دائرية للصورة
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // تأثير الظل للصورة
                      }}
                    />
                  </td>
                  <td>{product.desc}</td>
                  <td>{Math.round(product.price, 2)} OMR</td>
                  <td>{product.stocks}</td>
                  <td>
                    <Button
                      color="dark"
                      onClick={() => handleDelete(product._id)}
                      style={{
                        backgroundColor: "#333", // أسود داكن
                        borderColor: "#333",
                        padding: "8px 16px",
                        marginRight: "12px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                        transition:
                          "background-color 0.3s ease, transform 0.2s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff", // النص داخل الزر أبيض
                      }}
                      onMouseOver={
                        (e) => (e.target.style.backgroundColor = "#555") // تغيير اللون عند التحويم
                      }
                      onMouseOut={
                        (e) => (e.target.style.backgroundColor = "#333") // العودة للون الأصلي
                      }
                      onMouseDown={
                        (e) => (e.target.style.transform = "scale(0.95)") // تأثير الضغط
                      }
                      onMouseUp={
                        (e) => (e.target.style.transform = "scale(1)") // العودة لحجم الزر الأصلي
                      }
                    >
                      <FaTrash
                        style={{ marginRight: "8px", fontSize: "18px" }}
                      />
                      Delete
                    </Button>
                    <Button
                      color="dark"
                      onClick={() => handleUpdate(product._id)}
                      style={{
                        backgroundColor: "#333", // أسود داكن
                        borderColor: "#333",
                        padding: "8px 16px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                        transition:
                          "background-color 0.3s ease, transform 0.2s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff", // النص داخل الزر أبيض
                      }}
                      onMouseOver={
                        (e) => (e.target.style.backgroundColor = "#555") // تغيير اللون عند التحويم
                      }
                      onMouseOut={
                        (e) => (e.target.style.backgroundColor = "#333") // العودة للون الأصلي
                      }
                      onMouseDown={(e) =>
                        (e.target.style.transform = "scale(0.95)")
                      }
                      onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      <FaEdit
                        style={{ marginRight: "8px", fontSize: "18px" }}
                      />
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for Confirmation */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
        <ModalHeader toggle={() => setDeleteModal(false)}>
          Confirm Delete
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this product?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal for Add Product Confirmation */}
      <Modal isOpen={addModal} toggle={() => setAddModal(false)}>
        <ModalHeader toggle={() => setAddModal(false)}>
          Product Added
        </ModalHeader>
        <ModalBody>The product has been added successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setAddModal(false)}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ManageProducts;
