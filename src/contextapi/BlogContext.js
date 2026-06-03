// src/context/BlogContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

const DOMAIN = "www.affordableapartmentsingurgaon.com";
const BASE_URL = "https://gurgaon-backend.onrender.com";

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);

  const fetchBlogs = async (pageNum = 1) => {
  setLoading(true);
  setError("");

  try {
    const res = await axios.get(
      `${BASE_URL}/blog/fetchBlogs?domain=${DOMAIN}&page=${pageNum}&limit=${limit}`
    );

   

    const data = res.data;

    // ✅ FIXED
    setBlogs(data?.blogs || []);
    setTotal(data?.totalBlogs || 0);
    setPage(pageNum);

  } catch (err) {
    if (err.response) {
      setError(err.response.data?.message || "Server Error");
    } else if (err.request) {
      setError("No response from server");
    } else {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        page,
        total,
        limit,
        fetchBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);