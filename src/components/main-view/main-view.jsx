import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch("https://movieflix-application-717006838e7d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies: ", error));
  }, [token]);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Row className="justify-content-center g-4">
                {filteredMovies.map((movie) => (
                  <Col key={movie._id} md={4} sm={6} xs={12} className="mb-4">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            }
          />
          <Route
            path="/profile"
            element={<ProfileView user={user} movies={movies} />}
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
