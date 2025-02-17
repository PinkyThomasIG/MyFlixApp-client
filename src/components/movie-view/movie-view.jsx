import PropTypes from "prop-types";
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <p>
          <span>Description: </span>
          <span>{movie.description}</span>
        </p>
      </div>
      <div>
        <span>Genre: {movie.genre?.name}</span>
        <p>{movie.genre?.description}</p>
      </div>
      <div>
        <span>Director: {movie.director?.name}</span>
        <p>{movie.director?.bio}</p>
        <p>Birth Date: {movie.director?.birthDate}</p>
        {movie.director?.deathDate && (
          <p>Death Date: {movie.director.deathDate}</p>
        )}
      </div>
      <button
        onClick={onBackClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Back to Movies
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthDate: PropTypes.string,
      deathDate: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
