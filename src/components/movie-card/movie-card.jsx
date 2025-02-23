import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  if (!movie || !movie.title) return null;

  return (
    <Card className="movie-card">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>

        <div className="d-flex justify-content-between">
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">View Details</Button>
          </Link>
          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={() => onToggleFavorite(movie._id)}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
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
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
