import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";

const loadFromLocalStorage = () => {
  const moviesRetrieved = JSON.parse(localStorage.getItem("movies"));
  if (moviesRetrieved) return moviesRetrieved;
};

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  preloadedState: loadFromLocalStorage(),
});
