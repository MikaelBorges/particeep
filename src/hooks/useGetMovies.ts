import { useState, useEffect } from "react";
import { movies$ } from "../api/movies";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, setMovies } from "../slices/moviesSlice";
import { Movie } from "../api/moviesType";
import { BEGIN_PATH, API_KEY } from "../config";

export function useGetMovies() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [moviesRaw, setMoviesRaw] = useState([]);
  const state = useSelector(selectMovies);
  const movies: Movie[] = state.movies;

  useEffect(() => {
    /* async function main() {
      try {
        const moviesWithoutImages = await movies$;
        const data = await Promise.all(
          moviesWithoutImages.map(({ title }) =>
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`).then((response) =>
              response.json()
            )
          )
        );
        const images = data.map((movie) => BEGIN_PATH + movie.results[0].poster_path);
        const moviesWithImages = moviesWithoutImages.map((movie, index) => {
          return {
            ...movie,
            image: images[index],
          };
        });
        setMoviesRaw(moviesWithImages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    main(); */

    movies$
      .then((moviesWithoutImages) => {
        const getImages = async () => {
          const data = await Promise.all(
            moviesWithoutImages.map(({ title }) =>
              fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`).then((response) =>
                response.json()
              )
            )
          );
          const images = data.map((movie) => BEGIN_PATH + movie.results[0].poster_path);
          const moviesWithImages = JSON.parse(JSON.stringify(moviesWithoutImages));
          images.forEach((image, index) => (moviesWithImages[index].image = image));
          setMoviesRaw(moviesWithImages);

          const moviesRetrieved = JSON.parse(localStorage.getItem("movies"));
          if (moviesRetrieved) dispatch(setMovies(moviesRetrieved));
          else dispatch(setMovies(moviesWithImages));
        };
        getImages().catch(() => {
          setMoviesRaw(moviesWithoutImages);
          const moviesRetrieved = JSON.parse(localStorage.getItem("movies"));
          if (moviesRetrieved) dispatch(setMovies(moviesRetrieved));
          else dispatch(setMovies(moviesWithoutImages));
        });
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return { movies, isLoading, isError, moviesRaw };
}
