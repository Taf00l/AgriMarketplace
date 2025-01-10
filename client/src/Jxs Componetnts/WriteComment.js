import React, { useState } from "react";
import { FormGroup, Label, Input, Button, Alert } from "reactstrap";
import "./com.css";
const WriteComment = ({ onAddComment }) => {
  const [comment, setComment] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handlePostComment = () => {
    if (!comment.trim()) {
      alert("Please write your comment before submitting.");
      return;
    }

    onAddComment(comment); // تمرير التعليق إلى الصفحة الرئيسية
    setComment(""); // إعادة تعيين الحقل
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // إخفاء التنبيه
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>Write a Comment</h4>
      {showAlert && (
        <Alert color="success" style={{ textAlign: "center" }}>
          Your comment has been submitted successfully!
        </Alert>
      )}
      <FormGroup>
        <Label for="commentInput">Your Comment</Label>
        <Input
          type="textarea"
          id="commentInput"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          style={{ height: "100px", resize: "none" }}
        />
      </FormGroup>
      <Button color="primary" block onClick={handlePostComment}>
        Submit Comment
      </Button>
    </div>
  );
};

export default WriteComment;
