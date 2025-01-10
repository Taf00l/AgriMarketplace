import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import postsReducer from "../Features/PostSlice";
import { persistStore, persistReducer } from "redux-persist";
import manageUserReducer from "../Features/ManageUserSlice";
import { reset as resetManageUser } from "../Features/ManageUserSlice";
import { reset as resetUsers } from "../Features/UserSlice";
import { reset as resetCart } from "../Features/CartSlice";
import { reset as resetPosts } from "../Features/PostSlice";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";
import cartReducer from "../Features/CartSlice";
import productReducer from "../Features/ProductSlice";
import { reset as resetProducts } from "../Features/ProductSlice";
// Redux Persist config

const persistConfig = {
  key: "reduxstore", // The key to identify the persisted state in storage
  storage, // The storage method (localStorage)
};
const rootReducer = combineReducers({
  users: usersReducer, // Manage users slice of the state
  posts: postsReducer, // Manage posts slice of the state
  manageUsers: manageUserReducer,
  products: productReducer,
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

const persistore = persistStore(store);
const resetStore = () => {
  store.dispatch(resetUsers()); // Reset users state
  store.dispatch(resetPosts()); // Reset posts state
  store.dispatch(resetManageUser()); // Reset manage users state
  store.dispatch(resetProducts());
  store.dispatch(resetCart());
};

export { store, persistore, resetStore };
