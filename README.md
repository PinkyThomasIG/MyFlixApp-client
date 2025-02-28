# Movie App

Welcome to the Movie App! This project allows users to explore a movie database, login, and manage their favorite movies.

## Features

- Browse a catalog of movies.
- View movie details, including title, director, description, and genre.
- User authentication and personalized features.
- Responsive design for seamless use across devices.
- Navigation using React Router.

## Technologies Used

- **Frontend**: React, React Bootstrap, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **API Hosting**: Heroku
- **Frontend Hosting**: Netlify

## API Endpoints

- **POST /login** - Login a user and retrieve a token.
- **POST /users/create** - Register a new user.
- **GET /movies** - Fetch all movies.
- **GET /movies/:id** - Fetch details of a specific movie.
- **PUT /users/update/:userName** - Update user details.
- **DELETE /users/:userName** - Remove a user.

For complete API documentation, visit the `/documentation` endpoint.

## Setup

### Prerequisites

- Node.js
- MongoDB
- React

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-app.git
    cd movie-app
    npm install
    npm start
    npm start
   ```

### Environment Variables

Ensure to set up the following variables:

    - MONGO_URI for database connection.
    - HEROKU_API_URL for accessing the hosted API.

### Usage

    - Register or log in as a user.
    - Browse through the movie catalog.
    - Click on a movie to view its details.
    - Add or remove movies from your favorites list.
