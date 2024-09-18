// on va y mettre des interceptors
// pour intercepter any requests we re gooing to send
// and it will automatically add the correct headers so that no need to write it manually in our code
//      many times de manière répétitive
// on va utiliser AXIOS
// We are going to set up an "axios interceptor"
// A chque fois qu'une requete va etre envoyée, on va vérifier si on a un access token
// si on en a 1 ca va automatiquement l'ajouter à cette requête.
// Ainsi on n'a pas besoin de penset à ce code à partir du moment où on l'a écrit 1 fois.

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// PAS ENCORE USED : const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// How to import an ENV VAR
// import anything that is specified inside an environment variable file
// If we want to have an ENV VAR loaded inside of our "resct code" it needs to start with VITE
// The idea -> to have this in an ENV VAR so it's very easy for us to load and change what the URL should be.
//      (aller dans .env file)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// on va regarder si dans le localStorage on a un access token
//       Si OK -> we add it as an authorization header to our request
//       Si NOT, there is nothing to do because we don't have a header.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // that's the way to pass a JWT access token
      // we create an authorization header -> automatically handled by axios
      // it needs to start with bearer + 'space' + token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// we will export this object we just added an interceptor on.
// from now on we're going to use this api object rather than using axios by default
//  to send all the requests so the authorization token will be automatically added
export default api;
