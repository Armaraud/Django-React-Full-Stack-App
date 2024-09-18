// import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// As soon as we log out -> clear Refresh & Access
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

// we setup APP component to be able to navigate between != pages
// to do that we need to return the BrowserRouter
// In BrowserRouter we need to specify Routes
// ex 1 : path="/" the element we want to render is <ProtectedRoute>
//                          and inside we will render <Home />
// Meaning : We cannot access home if token NOT VALID
//            in our cas home is ony accessible by users logged in and authenticated
// ex 2 : path="/login" -> Not protected
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
