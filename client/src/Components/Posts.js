import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import moment from "moment";
import { getPosts, deletePost } from "../Features/PostSlice"; // Import your redux actions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarAlt,
  faTag,
  faTrashAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
const DisplayPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const currentUserEmail = useSelector((state) => state.users.user.email);

  const [modal, setModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    dispatch(getPosts()); // Fetch posts when the component is mounted
  }, [dispatch]);

  const userPosts = posts.filter((post) => post.email === currentUserEmail); // Filter posts by current user

  const toggleModal = () => setModal(!modal);

  const handleDelete = () => {
    if (postToDelete) {
      dispatch(deletePost({ postId: postToDelete, email: currentUserEmail }));
      setPostToDelete(null);
      toggleModal();
    }
  };

  const requestDelete = (postId) => {
    setPostToDelete(postId);
    toggleModal();
  };

  return (
    <Container
      style={{
        marginTop: "30px",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3
        className="display-6"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        My Feedback
      </h3>

      {userPosts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          No posts available yet. Be the first to share your feedback!
        </p>
      ) : (
        userPosts.map((post) => (
          <Row key={post._id} style={{ marginBottom: "20px" }}>
            <Col
              sm={12}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                position: "relative",
              }}
            >
              {/* Post Header */}
              <Row style={{ alignItems: "center", marginBottom: "10px" }}>
                <Col xs="auto">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      color: "#333",
                      fontSize: "18px",
                      marginRight: "8px",
                    }}
                  />
                  <strong style={{ color: "#333" }}>{post.name}</strong>
                </Col>
                <Col>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      textAlign: "right",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{
                        color: "#888",
                        marginRight: "5px",
                      }}
                    />
                    {moment(post.createdAt).fromNow()}
                  </p>
                </Col>
              </Row>

              {/* Post Content */}
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                {post.postMsg}
              </p>

              {/* Post Footer */}
              <Row style={{ marginTop: "10px" }}>
                <Col xs="auto">
                  <FontAwesomeIcon
                    icon={faTag}
                    style={{
                      color: "#333",
                      fontSize: "16px",
                      marginRight: "8px",
                    }}
                  />
                  <strong style={{ color: "#333" }}>Product:</strong>{" "}
                  {post.category}
                </Col>
              </Row>

              {/* Delete Post Button */}
              <Button
                color="danger"
                onClick={() => requestDelete(post._id)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "6px 10px",
                  borderRadius: "20px",
                  backgroundColor: "#f44336",
                  borderColor: "#f44336",
                }}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ marginRight: "5px", fontSize: "18px" }}
                />
                Delete
              </Button>
            </Col>
          </Row>
        ))
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader
          toggle={toggleModal}
          style={{
            backgroundColor: "#f8f8f8", // رمادي فاتح للعناوين
            color: "#000", // نص أسود
            borderRadius: "16px 16px 0 0",
          }}
        >
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            style={{ color: "#000", fontSize: "20px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Delete Feedback
          </span>
        </ModalHeader>
        <ModalBody
          style={{
            padding: "25px",
            color: "#333", // أسود خافت
            fontSize: "16px",
            lineHeight: "1.6",
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <p style={{ marginBottom: "15px", fontWeight: "600", color: "#000" }}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{ color: "#000", fontSize: "18px", marginRight: "8px" }}
            />
            Warning! Are you sure you want to delete this Feedback?
          </p>
          <p style={{ fontSize: "14px", color: "#777" }}>
            This action is <strong>irreversible</strong>, and the feedback
            cannot be recovered.
          </p>
        </ModalBody>
        <ModalFooter
          style={{ backgroundColor: "#f8f8f8", borderRadius: "0 0 16px 16px" }}
        >
          <Button
            onClick={toggleModal}
            style={{
              borderRadius: "20px",
              backgroundColor: "#e0e0e0", // رمادي فاتح
              color: "#000", // نص أسود
              border: "1px solid #ccc",
              padding: "8px 16px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            style={{
              borderRadius: "20px",
              backgroundColor: "#f44336",
              color: "#fff", // نص أبيض
              padding: "8px 16px",
              marginLeft: "10px",
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: "6px" }} />
            Confirm Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default DisplayPosts;
