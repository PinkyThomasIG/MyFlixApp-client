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

  // Fetch movies when the token is available
  useEffect(() => {
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
        console.log("Movies fetched:", data); // Check the data
        setMovies(data);
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }, [token]);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  // Render the appropriate view depending on the state
  if (!user) {
    return (
      <Container className="text-center mt-5">
        {isSigningUp ? (
          <SignupView
            onSignedUp={(user) => {
              setUser(user);
              setIsSigningUp(false);
            }}
          />
        ) : (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <Button variant="link" onClick={() => setIsSigningUp(true)}>
              Sign Up
            </Button>
          </>
        )}
      </Container>
    );
  }

  // If a movie is selected, show the MovieView
  if (selectedMovie) {
    return (
      <Container className="mt-4">
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Container>
    );
  }

  // If no movies, show an empty message
  if (movies.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h4>No movies available</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Logout Button */}
      <div className="d-flex justify-content-end">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Movie Grid */}
      <Row className="justify-content-center g-4">
        {movies.map((movie, index) => (
          <Col
            key={movie._id}
            md={4} // Sets the grid to display 3 movies per row
            sm={6} // On smaller screens, show 2 movies per row
            xs={12} // On extra small screens, show 1 movie per row
            className="mb-4"
          >
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) =>
                setSelectedMovie(newSelectedMovie)
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
