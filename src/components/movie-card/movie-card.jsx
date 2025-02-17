import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
  return <div onClick={() => onMovieClick(movie)}>{movie.title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
