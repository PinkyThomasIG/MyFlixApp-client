import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const MovieCard = ({ movie, onMovieClick }) => {
  if (!movie || !movie.title) return null;
  return (
    <Card className="movie-card" onClick={() => onMovieClick(movie)}>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
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
