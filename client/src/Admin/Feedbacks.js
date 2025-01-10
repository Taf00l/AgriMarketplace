import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Table } from "reactstrap";
import moment from "moment";

const Feedback = () => {
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status); // Get delete status

  useEffect(() => {
    if (postStatus === "succeeded") {
      // لا يوجد أي تعبير يتم تنفيذه هنا
    } else if (postStatus === "failed") {
      // لا يوجد أي تعبير يتم تنفيذه هنا
    }
  }, [postStatus]);

  return (
    <Container style={{ marginTop: "30px", paddingBottom: "30px" }}>
      {/* Table Design */}
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Products</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                No feedback available yet.
              </td>
            </tr>
          ) : (
            posts.map((post, index) => (
              <tr key={post._id}>
                <td>{index + 1}</td>
                <td>{post.name}</td>
                <td>{post.email}</td>
                <td>{post.category}</td>
                <td>{post.postMsg}</td>
                <td>{moment(post.createdAt).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Feedback;
