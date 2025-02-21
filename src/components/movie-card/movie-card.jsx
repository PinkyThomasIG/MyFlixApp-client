import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  if (!movie || !movie.title) return null;

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired, // Ensure your movie object has an image URL
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
};
