import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQovCe0H45fWwAtV31ajOdXRPTxSsMQgPIQ3lcZX_mAW0jXV3kH",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
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
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkUywIUXDjHSQJIaNHYVs08osgBpF5Ot-xmB_omyEZeeRP9Xug",
      description:
        "The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City.",
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
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRipfEoI8fb4qxidki3e_kp3fr_Kopvoi2yCKcpJGf2ngnKweMR",
      description:
        "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
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
