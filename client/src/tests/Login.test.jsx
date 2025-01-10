import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../Jxs Componetnts/Login";
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "../Features/UserSlice";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom"; // بدون '/extend-expect'

// إنشاء متجر مبدئي لاختبار المكون
const store = createStore(userReducer, {
  users: {
    user: { email: "test@example.com" },
    isSuccess: false,
    isError: false,
  },
});

describe("Login Component", () => {
  test("should render login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // التحقق من وجود الحقول
    expect(screen.getByLabelText(/Enter Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Your Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login Now/i)).toBeInTheDocument();
  });
});
