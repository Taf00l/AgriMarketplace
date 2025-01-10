import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";
const initialState = {
  posts: [],
  comments: [],
  likes: [],
};

export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
      postMsg: postData.postMsg,
      category: postData.category,
      email: postData.email,
      name: postData.name,
    });

    const post = response.data.post;
    return post; //Return the new post to Redux
  } catch (error) {
    console.log(error);
  }
});
export const getPosts = createAsyncThunk("post/getPosts", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
    return response.data.posts;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  try {
    //Pass along the URL the postId
    const response = await axios.put(
      `${ENV.SERVER_URL}/likePost/${postData.postId}`,
      {
        userId: postData.userId,
      }
    );
    const post = response.data.post;
    return post;
  } catch (error) {
    console.log(error);
  }
});
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, email }) => {
    // إرسال البريد الإلكتروني مع الـ postId
    try {
      const response = await axios.delete(
        `${ENV.SERVER_URL}/deletePost/${postId}`,
        {
          data: { email }, // إرسال البريد الإلكتروني في body
        }
      );
      return postId;
    } catch (error) {
      console.log("Error deleting post", error);
      throw new Error("Error deleting post");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle", // أو "loading" أو "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })

      .addCase(savePost.fulfilled, (state, action) => {
        console.log(action.payload);

        state.status = "succeeded";

        // Update the state with fetched posts adding the latest post in the beginning

        state.posts.unshift(action.payload);
      })

      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Update the state with fetched posts

        console.log(action.payload);

        state.posts = action.payload;
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log("Post deleted: ", action.payload); // تأكد من أن الـ postId يصل هنا
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        //Search the post id from the posts state
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );

        //If found, update the likes property of the found post to the current value of the likes
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.likes;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { reset } = postsSlice.actions; //export the function

export default postsSlice.reducer;
