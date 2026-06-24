"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LocalityContext = createContext();

export const LocalityProvider = ({ children }) => {
  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocalities = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        "https://gurgaon-backend.onrender.com/api/listed-properties/getUniqueLocalities"
      );
      if (res.data && res.data.success) {
        setLocalities(res.data.data || []);
      } else {
        setError("Failed to fetch localities");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalities();
  }, []);

  return (
    <LocalityContext.Provider
      value={{
        localities,
        loading,
        error,
        refetch: fetchLocalities,
      }}
    >
      {children}
    </LocalityContext.Provider>
  );
};

export const useLocality = () => useContext(LocalityContext);