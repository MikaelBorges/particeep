import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state = initialState, action) => {
      return { ...state, movies: action.payload };
    },
    removeMovie: (state = initialState, action) => {
      const listWithoutMovie = state.movies.filter(({ id }) => id !== action.payload);
      localStorage.setItem("movies", JSON.stringify(listWithoutMovie));
      return { ...state, movies: listWithoutMovie };
    },
    likeMovie: (state = initialState, action) => {
      const idSelected = action.payload;
      const listWithLikedMovie = state.movies.map((movie) => {
        if (movie.id === idSelected) {
          if (movie.alreadyDisliked) {
            return {
              ...movie,
              dislikes: movie.dislikes - 1,
              likes: movie.likes + 1,
              alreadyLiked: true,
              alreadyDisliked: false,
            };
          }
          if (!movie.alreadyLiked) {
            return {
              ...movie,
              likes: movie.likes + 1,
              alreadyLiked: true,
            };
          }
          if (movie.alreadyLiked) {
            return {
              ...movie,
              likes: movie.likes - 1,
              alreadyLiked: false,
            };
          }
          return movie;
        }
        return movie;
      });
      localStorage.setItem("movies", JSON.stringify(listWithLikedMovie));
      return { ...state, movies: listWithLikedMovie };
    },
    dislikeMovie: (state = initialState, action) => {
      const idSelected = action.payload;
      const listWithDislikedMovie = state.movies.map((movie) => {
        if (movie.id === idSelected) {
          if (movie.alreadyLiked) {
            return {
              ...movie,
              dislikes: movie.dislikes + 1,
              likes: movie.likes - 1,
              alreadyLiked: false,
              alreadyDisliked: true,
            };
          }
          if (!movie.alreadyDisliked) {
            return {
              ...movie,
              dislikes: movie.dislikes + 1,
              alreadyDisliked: true,
            };
          }
          if (movie.alreadyDisliked) {
            return {
              ...movie,
              dislikes: movie.dislikes - 1,
              alreadyDisliked: false,
            };
          }
          return movie;
        }
        return movie;
      });
      localStorage.setItem("movies", JSON.stringify(listWithDislikedMovie));
      return { ...state, movies: listWithDislikedMovie };
    },
    addMovie: (state = initialState, action) => {
      const movieToAdd = action.payload;
      const newListWithAddedMovie = [movieToAdd, ...state.movies];
      localStorage.setItem("movies", JSON.stringify(newListWithAddedMovie));
      return { ...state, movies: newListWithAddedMovie };
    },
    removeAllMovies: (state = initialState) => {
      localStorage.setItem("movies", JSON.stringify([]));
      return { ...state, movies: initialState.movies };
    },
  },
});

export const { setMovies, removeMovie, likeMovie, dislikeMovie, addMovie, removeAllMovies } = moviesSlice.actions;
export const selectMovies = (state) => state.movies;
export default moviesSlice.reducer;
