import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [deRegistrationMessage, setDeRegistrationMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setDeRegistrationMessage(""); // Clear de-registration message when logging out
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const favoriteMovies = user
    ? movies.filter((m) => user.FavoriteMovies.includes(m._id))
    : [];

  const handleDeregister = () => {
    if (!user || !user.Username) {
      console.error("User is not logged in or username is missing");
      return;
    }

    const username = user.Username;
    const url = `https://movieflix-application-717006838e7d.herokuapp.com/users/${username}`;

    console.log("Deregistering user with username:", username);

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("User deregistered successfully");
          setDeRegistrationMessage("You have been successfully deregistered.");
          handleLogout();
          setTimeout(() => setDeRegistrationMessage(""), 3000);
        } else {
          console.error("Error deregistering user:", response.status);
          setDeRegistrationMessage("Error deregistering user.");
          setTimeout(() => setDeRegistrationMessage(""), 3000);
        }
      })
      .catch((error) => {
        console.error("Error deregistering user:", error);
        setDeRegistrationMessage("Error deregistering user.");
        setTimeout(() => setDeRegistrationMessage(""), 3000);
      });
  };

  // Filter movies based on search input
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter.toLowerCase())
  );

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
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", JSON.stringify(user));
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

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      <Container className="mt-4">
        {/* Display deregistration success or error message */}
        {deRegistrationMessage && (
          <div className="alert alert-info">{deRegistrationMessage}</div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Row className="justify-content-center g-4">
                {filteredMovies.map((movie) => (
                  <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
                    <MovieCard
                      movie={movie}
                      onToggleFavorite={(movieId) => {
                        const updatedUser = { ...user };
                        if (user.FavoriteMovies.includes(movieId)) {
                          updatedUser.FavoriteMovies =
                            updatedUser.FavoriteMovies.filter(
                              (id) => id !== movieId
                            );
                        } else {
                          updatedUser.FavoriteMovies.push(movieId);
                        }
                        handleUserUpdate(updatedUser);
                      }}
                      isFavorite={user.FavoriteMovies.includes(movie._id)}
                    />
                  </Col>
                ))}
              </Row>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                movies={movies}
                favoriteMovies={favoriteMovies}
                onUpdateUser={handleUserUpdate}
                onToggleFavorite={(movieId) => {
                  const updatedUser = { ...user };
                  if (user.FavoriteMovies.includes(movieId)) {
                    updatedUser.FavoriteMovies =
                      updatedUser.FavoriteMovies.filter((id) => id !== movieId);
                  } else {
                    updatedUser.FavoriteMovies.push(movieId);
                  }
                  handleUserUpdate(updatedUser);
                }}
                onDeregister={handleDeregister}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};
