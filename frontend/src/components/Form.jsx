import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

// FCT take 2 'dynamic' props
// When we submit the form -> 'route' can be the token OR register route
// 'method' -> to define if we register or log in
function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    console.log("SSA AFFICHAGE 'e' de : const handleSubmit = async (e) : ", e);

    // preventDefault() : empéche de recharger la page
    // Cette méthode appelle la fonction preventDefault() sur l'objet événement e.
    // Elle empêche le comportement par défaut de l'événement d'avoir lieu.
    // Pour un formulaire, le comportement par défaut est de soumettre le formulaire et de recharger la page.
    e.preventDefault();

    // we send the data to the right route
    // Inside try we send a request
    try {
      const res = await api.post(route, { username, password });
      // If method is login we need to get access & refresh token
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      // dans tous les cas error or no on set to false
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;
