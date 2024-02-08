import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Films from './Films.jsx';
import Customers from './Customers.jsx'; // Import the Customers component
import './index.css';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/films',
    element: <Films />,
  },
  {
    path: '/customers', // Add a new route for the Customers page
    element: <Customers />,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
