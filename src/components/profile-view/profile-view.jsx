import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onDeregister }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newBirthday, setNewBirthday] = useState(user.birthday);
  const [newPassword, setNewPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch the user info using /users endpoint
    fetch(
      `https://movieflix-application-717006838e7d.herokuapp.com/users/${user.username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        const userFavoriteMovies = movies.filter((movie) =>
          data.FavoriteMovies.includes(movie._id)
        );
        setFavoriteMovies(userFavoriteMovies);
      })
      .catch((error) => console.error("Error fetching user info:", error));
  }, [token, user.username, movies]);

  // Update user info
  const handleUpdate = () => {
    const updatedUser = {
      Username: newUsername,
      Email: newEmail,
      Birthday: newBirthday,
      Password: newPassword,
    };

    fetch(
      `https://movieflix-application-717006838e7d.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("User updated successfully");
        } else {
          alert("Error updating user info");
        }
      })
      .catch((error) => console.error("Error updating user info:", error));
  };

  // Deregister user
  const handleDeregister = () => {
    fetch(
      `https://movieflix-application-717006838e7d.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          onDeregister();
          alert("User deregistered successfully");
        } else {
          alert("Error deregistering user");
        }
      })
      .catch((error) => console.error("Error deregistering user:", error));
  };

  // Add a movie to the favorites list
  const handleAddFavorite = (movieId) => {
    fetch(
      `https://movieflix-application-717006838e7d.herokuapp.com/users/${user.username}/favorites/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setFavoriteMovies((prevFavorites) => [
          ...prevFavorites,
          movies.find((movie) => movie._id === movieId),
        ]);
      } else {
        alert("Error adding movie to favorites");
      }
    });
  };

  // Remove a movie from the favorites list
  const handleRemoveFavorite = (movieId) => {
    fetch(
      `https://movieflix-application-717006838e7d.herokuapp.com/users/${user.username}/favorites/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setFavoriteMovies((prevFavorites) =>
          prevFavorites.filter((movie) => movie._id !== movieId)
        );
      } else {
        alert("Error removing movie from favorites");
      }
    });
  };

  if (!userInfo) return <Container>Loading...</Container>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>Profile Information</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={newBirthday}
                onChange={(e) => setNewBirthday(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Form>
          <Button variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Col>

        <Col md={6}>
          <h2>Favorite Movies</h2>
          <Row>
            {favoriteMovies.map((movie) => (
              <Col key={movie._id} md={4}>
                <MovieCard movie={movie} onMovieClick={() => {}} />
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  Remove from Favorites
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
