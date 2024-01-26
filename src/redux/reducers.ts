import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";

export const rootReducer = combineReducers({
  movies: moviesReducer,
});
