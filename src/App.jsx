import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';

function App() {
  const [topRentedFilms, setTopRentedFilms] = useState([]);
  const [topActors, setTopActors] = useState([]);
  const [expandedFilmId, setExpandedFilmId] = useState(null);
  const [expandedActorId, setExpandedActorId] = useState(null);
  const [actorFilms, setActorFilms] = useState([]);

  useEffect(() => {
    // Fetch top 5 rented films
    fetch('http://127.0.0.1:5000/test')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data received from the backend
        setTopRentedFilms(data);
      })
      .catch(error => console.error('Error fetching top films:', error));

    // Fetch top 5 actors in most movies
    fetch('http://127.0.0.1:5000/rest')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data received from the backend
        setTopActors(data);
      })
      .catch(error => console.error('Error fetching top actors:', error));
  }, []);

  const handleExpandFilmClick = (filmId) => {
    setExpandedFilmId(expandedFilmId === filmId ? null : filmId);
  };

  const handleExpandActorClick = (actorId) => {
    setExpandedActorId(expandedActorId === actorId ? null : actorId);
    if (expandedActorId !== actorId) {
      fetch(`http://127.0.0.1:5000/actor-films/${actorId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // Log the data received from the backend
          setActorFilms(data);
        })
        .catch(error => console.error('Error fetching actor films:', error));
    } else {
      setActorFilms([]);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="content">
        <h1>Welcome to Clerk Services</h1>

        {/* Top 5 Rented Films */}
        <h2>Top 5 Rented Films</h2>
        <ul>
          {topRentedFilms.map(film => (
            <li key={film.film_id}>
              <strong>Title:</strong> {film.title}, <strong>Rent Count:</strong> {film.rented}
              {expandedFilmId === film.film_id && (
                <>
                  <br />
                  <strong>Category:</strong> {film.category_name}, <strong>Film ID:</strong> {film.film_id}
                </>
              )}
              <button onClick={() => handleExpandFilmClick(film.film_id)}>
                {expandedFilmId === film.film_id ? 'Less Info' : 'More Info'}
              </button>
            </li>
          ))}
        </ul>

        {/* Top 5 Actors in Most Movies */}
        <h2>Top 5 Actors in Most Movies</h2>
        <ul>
          {topActors.map(actor => (
            <li key={actor.actor_id}>
              <strong>Name:</strong> {actor.first_name} {actor.last_name}, <strong>Total Movies:</strong> {actor.movies}
              {expandedActorId === actor.actor_id && (
                <>
                  <br />
                  <strong>Actor ID:</strong> {actor.actor_id}
                  <ul>
                    {actorFilms.map(film => (
                      <li key={film.film_id}>
                        <strong>Title:</strong> {film.title}, <strong>Rental Count:</strong> {film.rental_count}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <button onClick={() => handleExpandActorClick(actor.actor_id)}>
                {expandedActorId === actor.actor_id ? 'Less Info' : 'More Info'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
