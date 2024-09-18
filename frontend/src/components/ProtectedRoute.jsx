import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// We check we are authorized (= to be logged in) before accessing this route
//      or else we ask to login
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    // Get REFRESH_TOKEN
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    // we send a request to the backend with the REFRESH TOKEN to get a new ACCESS TOKEN
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken, // it should give a new ACCESS TOKEN
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // This will check if we need to refresh token or good to go
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // If not token
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    // If token, we check token's info like expiry date
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
