import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UsersData } from "../ExampleData";
import axios from "axios";
import * as ENV from "../config";
const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (UsersData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`, {
        name: UsersData.name,
        email: UsersData.email,
        phoneNumber: UsersData.phoneNumber,
        birthday: UsersData.birthday,
        password: UsersData.password,
      });
      console.log(response);
      const user = response.data.user; //retrieve the response from the server
      return user; //return the response from the server as payload to the thunk
    } catch (error) {
      console.log(error);
    }
  }
);
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data.user;
    console.log(response);

    return user;
  } catch (error) {
    //handle the error

    const errorMessage = "Invalid credentials";

    alert(errorMessage);

    throw new Error(errorMessage);
  }
});
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out

    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {}
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile", // Action type string for Redux
  async (userData) => {
    try {
      // Log the user data being sent for debugging purposes
      // console.log(userData);
      // Send a PUT request to the server to update the user profile
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/${userData.email}`, // API endpoint for updating user profile

        {
          // Request payload with user data to be updated
          email: userData.email,
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          birthday: userData.phoneNumber,
          password: userData.password,
          profilePic: userData.profilePic,
        },
        {
          headers: {
            //headers is necessary when uploading files with form-data in a request.
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Extract the updated user data from the server response
      const user = response.data.user;
      // Return the updated user data, which will be used by Redux to update the state
      return user;
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  }
);
export const userSlice = createSlice({
  name: "users", //name of the state

  initialState,

  reducers: {
    addUser: (state, action) => {
      //state is the current value of the state, action is triggered outside the reducer and provides a value as payload
      state.value.push(action.payload); //the payload is the value coming from the component, add the payload to the state
    },
    deleteUser: (state, action) => {
      //create a new array with the value that excludes the user with the email value from the action payload, and assign the new array to the state.
      state.value = state.value.filter((user) => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      state.value.map((user) => {
        //iterate the  array and compare the email with the email from the payload
        if (user.email === action.payload.email) {
          user.name = action.payload.name;
          user.phoneNumber = action.payload.phoneNumber;
          user.birthday = action.payload.birthday;
          user.password = action.payload.password;
        }
      });
    },
  },

  //builder.addCase(action creator(pending, fulfilled, rejected), reducer)
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // تخزين البيانات المستلمة من السيرفر
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isError = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload; //assign the payload which is the user object return from the server after authentication

        state.isLoading = false;

        state.isSuccess = true;
      })

      .addCase(login.rejected, (state) => {
        state.isLoading = false;

        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        // Clear user data or perform additional cleanup if needed
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })

      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser, deleteUser, updateUser, reset } = userSlice.actions; //export the function

export default userSlice.reducer;
