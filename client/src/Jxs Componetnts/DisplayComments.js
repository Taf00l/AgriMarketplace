import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"; // لتنسيق التواريخ
import { getPosts, likePost } from "../Features/PostSlice"; // لجلب التعليقات من Redux
import { FaThumbsUp } from "react-icons/fa"; // أيقونة الإعجاب
const DisplayComments = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts || []); // جلب التعليقات المخزنة
  const userId = useSelector((state) => state.users.user._id); // الحصول على معرف المستخدم

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts()); // إذا لم تكن التعليقات موجودة، يتم جلبها
    }
  }, [dispatch, posts]);

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: userId,
    };
    dispatch(likePost(postData));
  };

  if (!posts.length) {
    return <p>Loading comments...</p>; // رسالة تحميل عند الحاجة
  }

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <div className="comments-list">
        {posts.map((post) => (
          <div key={post._id} className="comment-card">
            {/* اسم المستخدم */}
            <h4 className="comment-author">{post.email || "Anonymous User"}</h4>
            {/* نص التعليق */}
            <p className="comment-message">{post.postMsg}</p>
            {/* علامة الإعجاب */}
            <button
              className="like-button"
              onClick={() => handleLikePost(post._id)}
            >
              <FaThumbsUp /> Like ({post.likes.count})
            </button>
            {/* تاريخ التعليق */}
            <small className="comment-date">
              {moment(post.createdAt).fromNow()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayComments;
