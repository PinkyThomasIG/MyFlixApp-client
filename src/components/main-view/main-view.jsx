import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    fetch("https://movieflix-application-717006838e7d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Log the entire response here
        setMovies(data); // Directly set the array of movies
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  if (!user) {
    return (
      <>
        {isSignup ? (
          <SignupView onSignedup={() => setIsSignup(false)} />
        ) : (
          <loginView OnLoggedIn={(user) => setUser(user)} />
        )}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Alread have an account? Log in" : "Sign up"}
        </button>
      </>
    );
  }

  // If a movie is selected, render the MovieView component
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} // Go back to the movie list
      />
    );
  }

  // If no movies are fetched, show a "list is empty" message
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // Otherwise, map over the movies and render a MovieCard for each
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id} // Use _id as the unique key for each movie
          movie={movie} // Pass the entire movie object to MovieCard
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          } // Set selected movie on click
        />
      ))}
    </div>
  );
};
