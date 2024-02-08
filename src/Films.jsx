import React, { useState } from 'react';
import Header from './Header.jsx';
import './Films.css'; // Import the CSS file for styling

function Films() {
  const [filmName, setFilmName] = useState('');
  const [actorName, setActorName] = useState('');
  const [genre, setGenre] = useState('');
  const [filmSearchResults, setFilmSearchResults] = useState([]);
  const [actorSearchResults, setActorSearchResults] = useState([]);
  const [genreSearchResults, setGenreSearchResults] = useState([]);
  const [expandedFilmId, setExpandedFilmId] = useState(null);

  const handleFilmSearch = () => {
    // Construct the URL with query parameters for searching films by film name
    const filmUrl = `http://127.0.0.1:5000/search-films?film_name=${filmName}`;

    // Make a GET request to the backend for searching films by film name
    fetch(filmUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data received from the backend
        setFilmSearchResults(data);
        // Clear search results for films by actor name and genre
        setActorSearchResults([]);
        setGenreSearchResults([]);
      })
      .catch(error => console.error('Error searching films:', error));
  };

  const handleActorSearch = () => {
    // Construct the URL with query parameters for searching films by actor name
    const actorUrl = `http://127.0.0.1:5000/search-films-by-actor?actor_name=${actorName}`;

    // Make a GET request to the backend for searching films by actor name
    fetch(actorUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data received from the backend
        setActorSearchResults(data);
        // Clear search results for films by film name and genre
        setFilmSearchResults([]);
        setGenreSearchResults([]);
      })
      .catch(error => console.error('Error searching films by actor:', error));
  };

  const handleGenreSearch = () => {
    // Construct the URL with query parameters for searching films by genre
    const genreUrl = `http://127.0.0.1:5000/search-films-by-genre?genre=${genre}`;

    // Make a GET request to the backend for searching films by genre
    fetch(genreUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data received from the backend
        setGenreSearchResults(data);
        // Clear search results for films by film name and actor name
        setFilmSearchResults([]);
        setActorSearchResults([]);
      })
      .catch(error => console.error('Error searching films by genre:', error));
  };

  const handleMoreInfoClick = (filmId) => {
    // Set the expanded film ID to show more info for the selected film
    setExpandedFilmId(filmId);
  };

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="search-container">
          {/* Search films by film name */}
          <div className="search-bar">
            <input
              type="text"
              value={filmName}
              onChange={e => setFilmName(e.target.value)}
              placeholder="Enter film name"
            />
            <button onClick={handleFilmSearch}>Search Films</button>
          </div>
          {/* Search films by actor name */}
          <div className="search-bar">
            <input
              type="text"
              value={actorName}
              onChange={e => setActorName(e.target.value)}
              placeholder="Enter actor name"
            />
            <button onClick={handleActorSearch}>Search Films by Actor</button>
          </div>
          {/* Search films by genre */}
          <div className="search-bar">
            <input
              type="text"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              placeholder="Enter genre"
            />
            <button onClick={handleGenreSearch}>Search Films by Genre</button>
          </div>
        </div>
        {/* Display search results */}
        <div className="search-results">
          {/* Display search results for films by film name */}
          <ul>
            {filmSearchResults.map(film => (
              <li key={film.film_id}>
                <strong>Title:</strong> {film.title}
                <br />
                <button onClick={() => handleMoreInfoClick(film.film_id)}>More Info</button>
                {expandedFilmId === film.film_id && (
                  <>
                    <br />
                    <strong>Description:</strong> {film.description}
                    <br />
                    <strong>Category:</strong> {film.category_name}
                    <br />
                    <strong>Release Year:</strong> {film.release_year}
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* Display search results for films by actor name */}
          <ul>
            {actorSearchResults.map(film => (
              <li key={film.film_id}>
                <strong>Title:</strong> {film.title}
                <br />
                <button onClick={() => handleMoreInfoClick(film.film_id)}>More Info</button>
                {expandedFilmId === film.film_id && (
                  <>
                    <br />
                    <strong>Description:</strong> {film.description}
                    <br />
                    <strong>Category:</strong> {film.category_name}
                    <br />
                    <strong>Release Year:</strong> {film.release_year}
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* Display search results for films by genre */}
          <ul>
            {genreSearchResults.map(film => (
              <li key={film.film_id}>
                <strong>Title:</strong> {film.title}
                <br />
                <button onClick={() => handleMoreInfoClick(film.film_id)}>More Info</button>
                {expandedFilmId === film.film_id && (
                  <>
                    <br />
                    <strong>Description:</strong> {film.description}
                    <br />
                    <strong>Category:</strong> {film.category_name}
                    <br />
                    <strong>Release Year:</strong> {film.release_year}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Films;
