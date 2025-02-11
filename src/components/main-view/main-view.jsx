import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology...",
      genre: {
        name: "Sci-Fi",
        description:
          "A genre that explores futuristic concepts such as advanced science and technology.",
      },
      director: {
        name: "Christopher Nolan",
        bio: "Christopher Nolan is a British-American film director, producer, and screenwriter.",
        birthDate: "1970-07-30",
        deathDate: null, // Director is still alive
      },
    },
    {
      id: 2,
      title: "The Dark Knight",
      poster: "https://image.tmdb.org/t/p/w500/rOn03xtD6b5l7hB3PRFzFbeO2rB.jpg",
      description:
        "When the menace known as The Joker emerges from his mysterious past...",
      genre: {
        name: "Action",
        description:
          "A genre characterized by high energy, physical activity, and intense scenes.",
      },
      director: {
        name: "Christopher Nolan",
        bio: "Christopher Nolan is a British-American film director, producer, and screenwriter.",
        birthDate: "1970-07-30",
        deathDate: null, // Director is still alive
      },
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      poster:
        "https://image.tmdb.org/t/p/w500/5b0b8d057773dbf3f2ec88c59710fe66.jpg",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      genre: {
        name: "Drama",
        description:
          "A genre that focuses on emotional and interpersonal themes, often exploring human conflict.",
      },
      director: {
        name: "Frank Darabont",
        bio: "Frank Darabont is a Hungarian-American film director, screenwriter, and producer, best known for adapting Stephen King's works.",
        birthDate: "1959-01-28",
        deathDate: null, // Director is still alive
      },
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
