import React from "react";
import "./MovieCard.css";
import Star from "../../assets/star.png";

const MovieCard = ({ movie }) => {
  return (
    <a href="" className="movie_card">
      <img src={movie.Poster} alt="" className="movie_poster"></img>

      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.Title}</h3>
        <div className="align_center movie_date_rate">
          <p>{movie.Released}</p>
          <p className="align_center">
            {movie.imdbRating}{" "}
            <img src={Star} alt="rating icon" className="card_emoji"></img>
          </p>
        </div>
        <p className="movie_description">{movie.Plot}</p>
      </div>
    </a>
  );
};

export default MovieCard;
