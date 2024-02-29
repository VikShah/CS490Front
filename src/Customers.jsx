import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import the Header component
import AddCustomerPopup from './AddCustomerPopup'; // Import the AddCustomerPopup component
import RentalHistoryPopup from './RentalHistoryPopup'; // Import the RentalHistoryPopup component
import EditCustomerPopup from './EditCustomerPopup'; // Import the EditCustomerPopup component

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State variable to control the visibility of the add customer popup
  const [rentalHistory, setRentalHistory] = useState(null); // State variable to store rental history data
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // State variable to store the ID of the selected customer
  const [showRentalHistoryPopup, setShowRentalHistoryPopup] = useState(false); // State variable to control the visibility of the rental history popup
  const [showEditPopup, setShowEditPopup] = useState(false); // State variable to control the visibility of the edit customer popup
  const [email, setEmail] = useState(''); // State variable for email address

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

  const handleSearch = async () => {
    try {
      let url = 'http://127.0.0.1:5000/search-customers?';
      if (customerId) url += `customer_id=${customerId}&`;
      if (firstNameInput) url += `first_name=${firstNameInput}&`;
      if (lastNameInput) url += `last_name=${lastNameInput}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
      
      setCustomerId('');
      setFirstNameInput('');
      setLastNameInput('');
    } catch (error) {
      console.error('Error searching customers:', error);
    }
  };

  const handleAddCustomer = async () => {
    setShowPopup(true); // Show the add customer popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the add customer popup
  };

  const handleAddCustomerPopup = async () => {
    try {
      const addResponse = await fetch('http://127.0.0.1:5000/add-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstNameInput,
          last_name: lastNameInput,
          email: email // Include email in the request body
        })
      });
      if (!addResponse.ok) {
        throw new Error('Error adding customer');
      }
  
      // Fetch the updated list of customers
      await fetchCustomers();
  
      // Close the add customer popup after adding the customer
      setShowPopup(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const deleteResponse = await fetch(`http://127.0.0.1:5000/delete-customer/${customerId}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) {
        throw new Error('Error deleting customer');
      }
      // Fetch the updated list of customers after deletion
      await fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleMoreInfoClick = async (customerId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/customer-rental-history/${customerId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRentalHistory(data);
      setSelectedCustomerId(customerId);
      setShowRentalHistoryPopup(true); // Show the rental history popup
    } catch (error) {
      console.error('Error fetching rental history:', error);
    }
  };

// Function to handle the click on the "Edit" button
const handleEditClick = (customerId) => {
  setSelectedCustomerId(customerId); // Set the selectedCustomerId here
  // Find the customer with the given ID
  const customerToEdit = customers.find(customer => customer.id === customerId);
  if (customerToEdit) {
    // Set the initial values for first name, last name, and email in the edit customer popup
    setFirstNameInput(customerToEdit.first_name || ''); // Set to empty string if null or undefined
    setLastNameInput(customerToEdit.last_name || ''); // Set to empty string if null or undefined
    setEmail(customerToEdit.email); // Set the email address
    setShowEditPopup(true); // Show the edit customer popup
  } else {
    console.error('Customer not found');
  }
};



  // Function to handle the update of customer details
// Function to handle the update of customer details
// Function to handle the update of customer details
const handleUpdateCustomer = async (customerId, updatedData) => {
  try {
    // Fetch the updated list of customers after updating
    // This part should be implemented based on how the frontend manages customer data locally
    // For example, if you're using a state management library like Redux, update the customer data in the store
    // If you're using local state, update the customer data locally in the component
    // You can implement this logic based on your frontend architecture

    // For demonstration purposes, assuming you're using local state (useState) to manage customer data
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        // Update only the fields that have changed
        return {
          ...customer,
          first_name: updatedData.firstName || customer.first_name,
          last_name: updatedData.lastName || customer.last_name
        };
      }
      return customer;
    });

    // Update the customer data in local state
    setCustomers(updatedCustomers);

    setShowEditPopup(false); // Close the edit customer popup after updating
  } catch (error) {
    console.error('Error updating customer:', error);
  }
};




  return (
    <div>
      <Header /> {/* Render the Header component */}
      <div>
        <h1>Customers Page</h1>
        <div>
          <label>
            Customer ID:
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
            />
          </label>
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleAddCustomer}>Add Customer</button>
        </div>
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>
              <strong>ID:</strong> {customer.id}<br />
              <strong>First Name:</strong> {customer.first_name}<br />
              <strong>Last Name:</strong> {customer.last_name}<br />
              {/* Add an "Edit" button with onClick event */}
              <button onClick={() => handleEditClick(customer.id)}>Edit</button>
              <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              <button onClick={() => handleMoreInfoClick(customer.id)}>More Info</button>
            </li>
          ))}
        </ul>
        {showPopup && (
          <AddCustomerPopup
            firstName={firstNameInput}
            lastName={lastNameInput}
            onFirstNameChange={setFirstNameInput}
            onLastNameChange={setLastNameInput}
            onEmailChange={setEmail} // Pass the setter function for email
            onAdd={handleAddCustomerPopup}
            onClose={handleClosePopup}
          />
        )}
        {showRentalHistoryPopup && (
          <RentalHistoryPopup
            customerId={selectedCustomerId}
            rentalHistory={rentalHistory}
            onClose={() => setShowRentalHistoryPopup(false)}
          />
        )}
        {/* Render the EditCustomerPopup if showEditPopup is true */}
        {showEditPopup && (
          <EditCustomerPopup
            customerId={selectedCustomerId}
            firstName={firstNameInput}
            lastName={lastNameInput}
            email={email} // Pass the email address as a prop
            onUpdate={(updatedData) => handleUpdateCustomer(selectedCustomerId, updatedData)}
            onClose={() => setShowEditPopup(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Customers;