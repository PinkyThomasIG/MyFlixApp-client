import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams(); // Get movieId from the URL
  const navigate = useNavigate(); // Hook to navigate between pages
  const movie = movies.find((m) => m._id === movieId); // Find the selected movie by its ID

  if (!movie) {
    return <h4>Movie not found</h4>; // Handle case when movie is not found
  }

  const { title, description, genre, director } = movie;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>

      <h3>Genre</h3>
      <p>
        <strong>{genre?.name}</strong>
      </p>
      <p>{genre?.description}</p>

      <h3>Director</h3>
      <p>
        <strong>{director?.name}</strong>
      </p>
      <p>
        <em>Bio: </em>
        {director?.bio}
      </p>
      <p>
        <em>Born: </em>
        {director?.birthDate}
      </p>
      <p>
        <em>Died: </em>
        {director?.deathDate || "N/A"}
      </p>

      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired, // Expect movies as an array
};
