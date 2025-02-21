/* import PropTypes from "prop-types";
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
}; */
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, onMovieClick }) => {
  if (!movie || !movie.title) return null;

  return (
    <Card className="movie-card shadow-sm">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="text-muted">
          {movie.description
            ? movie.description.length > 100
              ? movie.description.substring(0, 100) + "..."
              : movie.description
            : "No description available"}
        </Card.Text>
        <Button variant="primary" onClick={() => onMovieClick(movie)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
