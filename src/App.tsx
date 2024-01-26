import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiWarningDuotone } from "react-icons/pi";
import { TbReload } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import { MovieCard } from "./components/movieCard/movieCard";
import { Pagination } from "./components/pagination/pagination";
import { SelectCategory } from "./components/selectCategory/selectCategory";
import { SelectRangePage } from "./components/selectRangePage/selectRangePage";
import { API_KEY, BEGIN_PATH } from "./config";
import { useGetMovies } from "./hooks/useGetMovies";
import { addMovie, dislikeMovie, likeMovie, removeAllMovies, removeMovie, setMovies } from "./redux/slices/moviesSlice";

const defaultRange = 4;

const animation = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function App() {
  const dispatch = useDispatch();
  const { movies, isLoading, isError, moviesRaw } = useGetMovies();
  const [backgroundImagesOnCards, setBackgroundImagesOnCards] = useState(
    localStorage.getItem("noBackgroundImagesOnCards") ? false : true
  );
  const [titlesInsideCards, setTitlesInsideCards] = useState(localStorage.getItem("titlesInsideCards") ? true : false);
  const [searchMovieError, setSearchMovieError] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");

  const pageParams = Number(search.get("page")) ? Number(search.get("page")) : 1;
  const categoryParams = search.get("category");
  const rangeParams = Number(search.get("range")) ? Number(search.get("range")) : defaultRange;

  const filteredMovies = movies.filter(({ category }) => (categoryParams ? category === categoryParams : true));
  const visibleMovies = filteredMovies.slice(
    (pageParams - 1) * rangeParams,
    (pageParams - 1) * rangeParams + rangeParams
  );

  const categoriesRaw = movies.map(({ category }) => category);
  const categories = [...new Set(categoriesRaw)];

  const handleIncrementPage = () => {
    search.set("page", String(pageParams + 1));
    setSearch(search);
  };

  const handleDecrementPage = () => {
    if (pageParams === 2) search.delete("page");
    else search.set("page", String(pageParams - 1));
    setSearch(search);
  };

  const handleRemoveMovie = (idSelected: string) => {
    if (visibleMovies.length === 1 && filteredMovies.length > visibleMovies.length) {
      handleDecrementPage();
    }
    if (filteredMovies.length === 1) {
      search.delete("category");
      setSearch(search);
    }
    dispatch(removeMovie(idSelected));
  };

  const handleChangeCategory = (categorySelected: string) => {
    if (categorySelected.length) search.set("category", categorySelected);
    else search.delete("category");
    search.delete("page");
    setSearch(search);
  };

  const handleChangeRange = (rangeSelected: number) => {
    if (rangeSelected !== defaultRange) search.set("range", String(rangeSelected));
    else search.delete("range");
    search.delete("page");
    setSearch(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value;
    const searchMovie = async (keyword) => {
      await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length) {
            setSearchMovieError(false);
            const movieFound = data.results[0];
            const newId = movies.length ? String(Number(movies[0].id) - 1) : 1;
            const newMovie = {
              id: newId,
              image: BEGIN_PATH + movieFound.poster_path,
              title: movieFound.title,
              category: "New",
              likes: Math.floor(Math.random() * 10),
              dislikes: Math.floor(Math.random() * 10),
            };
            dispatch(addMovie(newMovie));
            setInputSearch("");
          } else setSearchMovieError(true);
        })
        .catch(() => setSearchMovieError(true));
    };
    searchMovie(keyword);
  };

  const handleChangeInputSearch = (value) => {
    setInputSearch(value);
    if (searchMovieError) setSearchMovieError(false);
  };

  const handleReloadMovies = () => {
    localStorage.removeItem("movies");
    dispatch(setMovies(moviesRaw));
  };

  const handleTitleInsideCard = () => {
    if (localStorage.getItem("titlesInsideCards")) localStorage.removeItem("titlesInsideCards");
    else localStorage.setItem("titlesInsideCards", JSON.stringify(true));
    setTitlesInsideCards(!titlesInsideCards);
  };

  const handleBackgroundImagesOnCards = () => {
    if (localStorage.getItem("noBackgroundImagesOnCards")) localStorage.removeItem("noBackgroundImagesOnCards");
    else localStorage.setItem("noBackgroundImagesOnCards", JSON.stringify(true));
    setBackgroundImagesOnCards(!backgroundImagesOnCards);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1 className="title">Films</h1>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="input-container">
              <input
                required
                autoFocus
                value={inputSearch}
                placeholder="ajouter un film"
                onChange={(e) => handleChangeInputSearch(e.target.value)}
                className={`header-input ${searchMovieError ? "header-input-warning" : ""}`}
                type="text"
                name="search"
              />
              {searchMovieError && <PiWarningDuotone className="warning-icon" />}
            </div>
            <button title="ajouter un film" className="upload-movie" type="submit">
              <AiOutlinePlusCircle />
            </button>
          </form>
        </div>
        <div className="header-right">
          <button onClick={() => dispatch(removeAllMovies())}>supprimer tous les films</button>
          <button onClick={() => handleTitleInsideCard()}>changer la position des titres</button>
          <button onClick={() => handleBackgroundImagesOnCards()}>changer la position des images</button>
        </div>
      </header>
      {isError && <p className="error">Erreur de chargement des films</p>}
      <main>
        <div className="sticky-block top">
          <div className="category-reload-container">
            <SelectCategory categories={categories} categoryParams={categoryParams} onChange={handleChangeCategory} />
            <button title="restaurer les films" onClick={() => handleReloadMovies()}>
              <TbReload />
            </button>
          </div>

          {Boolean(movies.length) && (
            <p className="info">
              {filteredMovies.length} film
              {filteredMovies.length > 1 ? "s" : ""} {categoryParams ? "dans cette catégorie" : "au total"}
            </p>
          )}
        </div>
        {isLoading ? (
          <p>Chargement...</p>
        ) : movies.length ? (
          <motion.ul initial="hidden" variants={animation} animate="visible" className="movies">
            {visibleMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemoveMovie={handleRemoveMovie}
                onClickLike={(idSelected) => dispatch(likeMovie(idSelected))}
                onClickDislike={(idSelected) => dispatch(dislikeMovie(idSelected))}
                backgroundImagesOnCards={backgroundImagesOnCards}
                titlesInsideCards={titlesInsideCards}
              />
            ))}
          </motion.ul>
        ) : (
          <p>Aucun film</p>
        )}

        <div className="sticky-block bottom">
          <SelectRangePage rangeParams={rangeParams} onChange={handleChangeRange} />
          <Pagination
            page={pageParams}
            disabledPrev={pageParams === 1}
            onPrev={() => handleDecrementPage()}
            disabledNext={(pageParams - 1) * rangeParams + rangeParams >= filteredMovies.length}
            onNext={() => handleIncrementPage()}
          />
        </div>
      </main>
    </>
  );
}
