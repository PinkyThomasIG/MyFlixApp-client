import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    // Check if there's an authToken in localStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://movieflix-application-717006838e7d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); // Set movies only when we successfully get the data
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }, [token]);

  if (!user) {
    return isSigningUp ? (
      <SignupView
        onSignedUp={(user) => {
          setUser(user);
          setIsSigningUp(false); // Switch to login view after signup
        }}
      />
    ) : (
      // <div>
      <Container className="text-center mt-4">
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <Button variant="link" onClick={() => setIsSigningUp(true)}>
          Sign Up
        </Button>
      </Container>
      // </Container><button onClick={() => setIsSigningUp(true)}>Sign Up</button>
      // </div>
    );
  }

  // logout functionality
  const handleLogout = () => {
    setUser(null); // set user to null to logout
    setToken(null);
    localStorage.removeItem("authToken"); // Remove token from localStorage
  };

  // If a movie is selected, render the MovieView component
  if (selectedMovie) {
    return (
      <Container>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)} // Go back to the movie list
        />
      </Container>
    );
  }

  // If no movies are fetched, show a "list is empty" message
  if (movies.length === 0) {
    return (
      <Container className="text-center mt-4">
        <h4>The list is empty!</h4>
      </Container>
    );
  }

  // Otherwise, map over the movies and render a MovieCard for each
  return (
    <Container>
      <div className="d-flex justify-content-end my-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Row className="justify-content-center">
        {movies.map((movie) => (
          <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
            <MovieCard
              //         key={movie._id} // Use _id as the unique key for each movie
              movie={movie} // Pass the entire movie object to MovieCard
              onMovieClick={(newSelectedMovie) =>
                setSelectedMovie(newSelectedMovie)
              } // Set selected movie on click
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
