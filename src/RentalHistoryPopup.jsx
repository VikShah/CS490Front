import React, { useState } from 'react';
import './RentalHistoryPopup.css'; // Import the CSS file

function RentalHistoryPopup({ rentalHistory, onClose }) {
  const [updatedRentalHistory, setUpdatedRentalHistory] = useState(rentalHistory);

  // Function to toggle the return status
  const toggleReturnStatus = (rentalId) => {
    const updatedHistory = updatedRentalHistory.map(rental => {
      if (rental.rental_id === rentalId) {
        // Toggle the return status
        return {
          ...rental,
          return_date: rental.return_date ? null : new Date().toISOString() // If return_date exists, set to null; otherwise set to current date
        };
      }
      return rental;
    });
    setUpdatedRentalHistory(updatedHistory);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>Rental History</h2>
        <ul>
          {updatedRentalHistory.map(rental => (
            <li key={rental.rental_id}>
              <strong>Title:</strong> {rental.film_title}<br />
              <strong>Rental ID:</strong> {rental.rental_id}<br />
              <strong>Return status:</strong> {rental.return_date ? 'Returned' : 'Not returned'}
              {/* Add a button to toggle return status */}
              <button onClick={() => toggleReturnStatus(rental.rental_id)}>
                {rental.return_date ? 'Mark as Not Returned' : 'Mark as Returned'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RentalHistoryPopup;
