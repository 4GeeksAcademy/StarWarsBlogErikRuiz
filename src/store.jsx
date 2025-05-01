import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const API_BASE = "https://www.swapi.tech/api";

export const ContextProvider = ({ children }) => {
  const [store, setStore] = useState({
    characters: [],
    planets: [],
    vehicles: [],
    favorites: [],
    readLater: [],
    theme: "light",
  });

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`);
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  };

  const fetchAllData = async () => {
    const [characters, planets, vehicles] = await Promise.all([
      fetchData("people"),
      fetchData("planets"),
      fetchData("vehicles"),
    ]);
    setStore((prev) => ({ ...prev, characters, planets, vehicles }));
  };

  const addFavorite = (item) => {
    setStore((prev) => ({
      ...prev,
      favorites: [...prev.favorites, item],
    }));
  };

  const removeFavorite = (uid) => {
    setStore((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((fav) => fav.uid !== uid),
    }));
  };

  const toggleTheme = () => {
    setStore((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const actions = {
    fetchAllData,
    addFavorite,
    removeFavorite,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};
