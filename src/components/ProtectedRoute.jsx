import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Check for JWT token

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children; // If authenticated, render the children
}

export default ProtectedRoute;
