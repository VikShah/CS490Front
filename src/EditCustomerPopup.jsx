import React, { useState } from 'react';

function EditCustomerPopup({ firstName, lastName, onUpdate, onClose }) {
  const [newFirstName, setNewFirstName] = useState(firstName); // Initialize state for the new first name
  const [newLastName, setNewLastName] = useState(lastName); // Initialize state for the new last name

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ firstName: newFirstName, lastName: newLastName }); // Pass the updated customer data to the onUpdate function
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomerPopup;
