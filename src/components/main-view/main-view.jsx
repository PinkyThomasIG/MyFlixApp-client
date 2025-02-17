import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movieflix-application-717006838e7d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging step
        const moviesFromApi = Array.isArray(data.movie) ? data.movie : [];
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  /* if (!data || !data.movie) {
          console.error("Unexpected API response structure");
          return;
        }

        const moviesFromApi = data.movie.map((movie) => ({
          id: movie._id,
          title: movie.title,
          description: movie.description || "No description available.",
          director: movie.director || {}, // Handle missing director
          genre: movie.genre || {}, // Handle missing genre
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []); */

  /* useEffect(() => {
    fetch("https://movieflix-application-717006838e7d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.movie.map((movie) => ({
          id: movie._id,
          title: movie.title,
          description: movie.description,
          director: movie.director?.Name,
          genre: movie.genre?.Name,
        }));

        setMovies(moviesFromApi);
      });
  }, []); */

  /* .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id, // Using _id from MongoDB
          title: movie.Title, // Match exact field names from API
          image: movie.ImagePath, // Adjust to your API response
          director: movie.Director?.Name, // Match API structure
        }));
        setMovies(moviesFromApi);
      })*/

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie); // Update the selected movie
          }}
        />
      ))}
    </div>
  );
};
