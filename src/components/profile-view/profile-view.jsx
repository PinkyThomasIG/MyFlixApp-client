import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

export const ProfileView = ({
  user,
  movies,
  favoriteMovies,
  onUpdateUser,
  onDeregister,
  onToggleFavorite,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user || {});

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedUser(user); // Reset to original user data
  };

  const handleSaveChanges = () => {
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const handleUpdateUserField = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-4">
      <h2>Your Profile</h2>

      {/* Profile Details Section */}
      {isEditing ? (
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="Username"
              value={updatedUser.Username || ""}
              onChange={handleUpdateUserField}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={updatedUser.Email || ""}
              onChange={handleUpdateUserField}
            />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="Birthday"
              value={
                updatedUser.Birthday
                  ? new Date(updatedUser.Birthday).toLocaleDateString("en-CA")
                  : ""
              }
              onChange={handleUpdateUserField}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveChanges}
              className="ms-2"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <h4>Username: {user?.Username || "N/A"}</h4>
          <h5>Email: {user?.Email || "N/A"}</h5>
          <h5>
            Date of Birth:{" "}
            {user?.Birthday
              ? new Date(user.Birthday).toLocaleDateString()
              : "N/A"}
          </h5>
          <Button variant="primary" onClick={handleEditClick} className="mt-3">
            Edit Profile
          </Button>
        </div>
      )}

      {/* Favorite Movies Section */}
      <h3 className="mt-4">Favorite Movies</h3>
      <Row className="justify-content-center g-4">
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
            <MovieCard
              movie={movie}
              onToggleFavorite={() => onToggleFavorite(movie._id)} // Unfavorite functionality
              isFavorite={true} // Always true because we're only passing favorite movies here
            />
          </Col>
        ))}
      </Row>

      {/* Deregister Button */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="danger" onClick={onDeregister}>
          Deregister
        </Button>
      </div>
    </Container>
  );
};
