import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import the Header component

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []); // Fetch customers only once when the component mounts

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/customers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div>
      <Header /> {/* Render the Header component */}
      <div>
        <h1>Customers Page</h1>
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>
              <strong>ID:</strong> {customer.id}<br />
              <strong>First Name:</strong> {customer.first_name}<br />
              <strong>Last Name:</strong> {customer.last_name}<br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Customers;
