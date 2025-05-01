import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Detail from "./views/Details";
import { useAppContext } from "./store";
import CustomNavbar from "./components/Navbar";

function App() {
  const {
    store: { theme },
  } = useAppContext();

  return (
    <div className={`min-vh-100 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <CustomNavbar />
      <div className="container py-4 fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
