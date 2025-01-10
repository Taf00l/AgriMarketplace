import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"; // For formatting dates
import { getPosts } from "../Features/PostSlice"; // Fetch posts from Redux
import { Container, Row, Col, Button } from "reactstrap";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa"; // Importing required icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import "./CustomerReviews.css"; // Custom CSS for styles

const CustomerReviews = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts || []); // Default empty array if posts are not available

  const [currentPostIndex, setCurrentPostIndex] = useState(0); // Track the current index of the posts

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts()); // Fetch posts if they are not already available
    }
  }, [dispatch, posts]);

  // Slice posts to display 3 at a time
  const postsToDisplay = posts?.length
    ? posts.slice(currentPostIndex, currentPostIndex + 3)
    : [];

  const nextPost = () => {
    if (currentPostIndex + 3 < posts.length) {
      setCurrentPostIndex(currentPostIndex + 3); // Move to the next set of 3 posts
    }
  };

  const prevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 3); // Move to the previous set of 3 posts
    }
  };

  if (!posts.length) {
    return <p>Loading customer reviews...</p>; // Display loading message when posts are being fetched
  }

  return (
    <Container className="reviews-container">
      <h2 className="reviews-title">Customer Feedback</h2>
      <Row>
        {postsToDisplay.map((post, index) => (
          <Col
            key={post._id}
            md={postsToDisplay.length === 2 ? 6 : 4}
            className="d-flex justify-content-center"
          >
            <div className="review-card">
              <FaQuoteLeft className="quote-icon" />
              <h4 className="reviewer-name">{post.name}</h4>
              <p className="review-message">{post.postMsg}</p>
              <p className="review-message">
                <FontAwesomeIcon
                  icon={faTag}
                  style={{
                    color: "#555",
                    fontSize: "16px",
                    marginRight: "8px",
                  }}
                />
                <strong>Product:</strong> {post.category}
              </p>
              <small className="review-date">
                {moment(post.createdAt).fromNow()}
              </small>
            </div>
          </Col>
        ))}
      </Row>

      <div className="pagination-buttons">
        <Button
          onClick={prevPost}
          disabled={currentPostIndex === 0}
          className="pagination-button"
        >
          <FaArrowLeft className="pagination-icon" /> Previous
        </Button>

        <Button
          onClick={nextPost}
          disabled={currentPostIndex + 1 >= posts.length}
          className="pagination-button"
        >
          Next <FaArrowRight className="pagination-icon" />
        </Button>
      </div>
    </Container>
  );
};

export default CustomerReviews;
