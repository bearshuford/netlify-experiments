import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { SearchResults, SeriesDetails } from "./components";
import { AuthContext } from "./AuthContext";
import "./App.css";

const defaultVibrate = {
  startDelay: 500,
  duration: 400,
  weakMagnitude: 0,
  strongMagnitude: 0.5,
};

const endpoints = {
  newToken: `${window.location.origin}/.netlify/functions/gettoken`,
};

function App() {
  const [query, setQuery] = useState("");

  const { setSpecial, setToken, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const getLocalToken = async () => {
      setLoading(true)
      try {
        const special = window.localStorage.getItem("userKey");
        const localToken = window.localStorage.getItem("token");
        if (!!special) setSpecial(special);
        if (!!localToken) return localToken;
        return false;
      } catch (error) {}
    }

    const getServerToken = async () => {
      setLoading(true)
      try {
        const response = await fetch(endpoints.newToken, { mode: "cors" });
        let newToken = await response.json();
        window.localStorage.setItem("token", newToken);
        return newToken;
      } catch (error) {
        return false;
      } 
    };
    const getToken = async () => {
      try {
        let token = await getLocalToken();
        if(!token){
          token = await getServerToken();
        }
        setToken(token);
      }
      catch (error) {
        console.log('error getting tvdb token', error)
      }
    }

    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Router>
        <Route path="/series/:id" component={SeriesDetails} />
        <Route path="/" exact>
          <>
            <label>search for movies and tv shows</label>
            <input
              autoFocus
              onChange={({ target }) => setQuery(target.value)}
              value={query}
              tabIndex="0"
            />
            {query && query.length > 0 && <SearchResults query={query} />}
          </>
        </Route>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
