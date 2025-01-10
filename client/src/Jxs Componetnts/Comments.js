import React, { useState } from "react";
import WriteComment from "./WriteComment";
import DisplayComments from "./DisplayComments";
import { Container, Row, Col } from "reactstrap";

const CommentSystem = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments]); // إضافة التعليق الجديد في الأعلى
  };

  return (
    <div>
<div>       
      
          <WriteComment onAddComment={handleAddComment} />
       </div> 
<br></br><br></br>
      <di>
       
          <DisplayComments comments={comments} /></di></div>
  );
};

export default CommentSystem;