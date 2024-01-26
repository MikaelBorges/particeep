import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

const loadFromLocalStorage = () => {
  const moviesRetrieved = JSON.parse(localStorage.getItem("movies"));
  if (moviesRetrieved) return moviesRetrieved;
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
  devTools: process.env.NODE_ENV !== "production",
});
