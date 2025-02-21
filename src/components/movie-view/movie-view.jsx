import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const MovieView = () => {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch the movie details based on the movie ID
    fetch(
      `https://movieflix-application-717006838e7d.herokuapp.com/movies/${id}`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]); // Re-run if `id` changes

  if (!movie) {
    return <div>Loading...</div>; // Loading state while fetching movie data
  }

  return (
    <div className="movie-view">
      <div>
        <img className="movie-image" src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Birth Date: </span>
        <span>{movie.director.birthDate}</span>
      </div>
      {movie.director.deathDate && (
        <div>
          <span>Death Date: </span>
          <span>{movie.director.deathDate}</span>
        </div>
      )}

      <Link to="/">
        <button className="back-button">Back to Movies</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      bio: PropTypes.string,
      birthDate: PropTypes.string,
      deathDate: PropTypes.string,
      name: PropTypes.string,
    }),
    genre: PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};
