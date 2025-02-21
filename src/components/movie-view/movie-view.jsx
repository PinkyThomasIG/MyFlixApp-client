import { useParams, Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <h4>Movie not found</h4>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Director: {movie.director?.name}</p>
      <Link to="/">Back to Movie List</Link>
    </div>
  );
};
