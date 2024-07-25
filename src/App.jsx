import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      <MovieList searchQuery={searchQuery} />
    </div>
  );
};

export default App;
