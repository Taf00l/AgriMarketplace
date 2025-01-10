import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  allUsers: [], // Array to store user data
  status: "idle", // Status of the async operation: 'idle', 'loading', 'succeeded', 'failed'
  iserror: null, // Error message if the async operation fails
};
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getUsers`);
    return response.data.users;
    //console.log(response);
  } catch (error) {
    console.log(error);
  }
});
export const deleteUser = createAsyncThunk(
  "manageUser/deleteUser",
  async (id) => {
    try {
      // Use backticks (`) for template literals
      const response = await axios.delete(`${ENV.SERVER_URL}/deleteUser/${id}`);

      // Optionally return the id if you need it in the reducer
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData) => {
    try {
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/${userData.email}`,
        userData
      );
      console.log("API Response: ", response.data); // طباعة الاستجابة
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error); // طباعة الخطأ
      throw error; // ألقِ الخطأ ليتعامل معه reducer
    }
  }
);

export const manageUserSlice = createSlice({
  name: "allUsers", // name of the state
  initialState, // initial value of the state
  reducers: { reset: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // تحديث المستخدم في الـ state
        const updatedUser = action.payload.user;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        state.status = "succeeded";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      });
  },
});

export const { reset } = manageUserSlice.actions;
export default manageUserSlice.reducer;
