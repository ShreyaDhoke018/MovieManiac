import React, { useEffect, useState } from "react";
//library used for sorting
import _ from "lodash";

import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  //this will run on only first render
  useEffect(() => {
    fetchMovies();
  }, []);

  //Runs on the first render
  //And any time any dependency value changes
  useEffect(() => {
    //CONDITION
    if (sort.by !== "default") {
      //first parameter: array which we want to sort
      //second param: array of properties by which we want to sort
      //third param: ascending or descending
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);

      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  //fetch movies from api using the Search parameter of omdb
  const fetchMovies = async () => {
    const response = await fetch(
      "https://www.omdbapi.com/?s=new&apikey=211c8b17&"
    );
    const data = await response.json();
    console.log(">>movies:", data);
    fetchMovieDetails(data.Search);
  };

  //get more details of movies using their imdb id
  const fetchMovieDetails = async (movieList) => {
    const detailedMovies = await Promise.all(
      movieList.map(async (movie) => {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=211c8b17`
        );
        return await response.json();
      })
    );
    console.log(">>>detailedMovies:", detailedMovies);
    setMovies(detailedMovies);
    setFilterMovies(detailedMovies);
  };

  //filter according to ratings
  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);

      const filtered = movies.filter((movie) => movie.imdbRating >= rate);
      setFilterMovies(filtered);
    }
  };

  //for sorting movies
  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular{" "}
          <img src={Fire} alt="fire emoji" className="navbar_emoji"></img>
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name="by"
            id=""
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="Released">Date</option>
            <option value="imdbRating">Rating</option>
          </select>
          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
