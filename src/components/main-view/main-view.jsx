// main-view.jsx
import { useState, useEffect } from "react";
import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view"; // Add ProfileView import
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavigationBar } from "../navigation-bar/navigation-bar"; // Import NavigationBar component

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch token from localStorage and fetch movies
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
        setMovies(data);
      })
      .catch((error) => console.error("Error fetching movies: ", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clear token from localStorage
  };

  return (
    <BrowserRouter>
      <Container>
        {/* Navigation Bar */}
        <NavigationBar user={user} onLoggedOut={handleLogout} />

        {/* Routes for Pages */}
        <Routes>
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} />}
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <Row className="justify-content-center g-4">
                  {movies.map((movie) => (
                    <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user ? (
                <SignupView
                  onSignedUp={(user) => {
                    setUser(user);
                    setIsSigningUp(false);
                  }}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? <Navigate to="/login" /> : <ProfileView user={user} />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
