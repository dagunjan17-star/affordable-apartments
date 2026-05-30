"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {

  const [dailyLimit,setDailyLimit]=useState(50);

  // ================= MAIN STATE =================
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(100);
  const [propertyType,setPropertyType]=useState("Studio Apartments, 1 BHK,2 BHK,3 BHK,4 BHK,5 BHK,6 BHK")

  const [filters, setFilters] = useState({
    search: "apartments",
    listingType: "sale, rent ",
    propertyCategory: "residential",
    city: "Gurgaon",
    minPrice: 100000,     // ✅ 1 lakh
   maxPrice: 10000001,
  
  });

  // ================= LOCALITY STATE =================
  const [localityData, setLocalityData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);

  const [localityParams, setLocalityParams] = useState({
    locality: "",
    city: "Gurgaon",
propertyType: "1 BHK,2 BHK,3 BHK,4 BHK,5 BHK,6 BHK,Studio Apartments",
    listingType: "sale,rent",
    page: 1,
    limit: 10,
     minPrice: 100000,     // ✅ 1 lakh
   maxPrice: 10000001,
  });

  // ================= PAGINATION =================
  const fetchProperties = async () => {
    try {
      setLoading(true);


      const query = new URLSearchParams({
        ...filters,
        page,
        limit,
propertyType: "1 BHK,2 BHK,3 BHK,4 BHK,5 BHK,6 BHK,Studio Apartments"
      }).toString();

      const res = await axios.get(
        `https://gurgaon-backend.onrender.com/api/listed-properties/searchProperties?${query}`
      );

      setTotalPages(res?.data?.totalPages || 1);
      setProperties(res?.data?.data || []);
    } catch {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  // ================= FULL DATA =================
  const fetchAllProperties = async () => {
    try {
      const res = await axios.get(
        "https://gurgaon-backend.onrender.com/api/listed-properties/searchProperties?page=1&limit=100&city=gurgaon"
      );

      setAllProperties(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOCALITY API =================
  const fetchByLocality = async (customParams = {}) => {
    try {
      setLoading2(true);
      setError2(null);
setLocalityData([])
      const finalParams = {
        ...localityParams,
        ...customParams,
      };

      const query = new URLSearchParams(finalParams).toString();

      const res = await axios.get(
        `https://gurgaon-backend.onrender.com/api/listed-properties/searchByLocality?${query}`
      );

      console.log("LOCALITY DATA:", res.data.data.length);

      setLocalityData(res?.data?.data || []);
    } catch (err) {
      setError2("Locality fetch failed");
    } finally {
      setLoading2(false);
    }
  };


   const [typeProperties, setTypeProperties] = useState([]);
  const [typeLoading, setTypeLoading] = useState(false);
  const [error3, setError3] = useState ()

  const fetchPropertiesByType = async (type, pageNumber = 1) => {
  try {
    setTypeLoading(true);
    setError3(null);

    const query = new URLSearchParams({
      ...filters,
      propertyType: type,
      page: pageNumber,
      limit,
    }).toString();

    const res = await axios.get(
      `https://gurgaon-backend.onrender.com/api/listed-properties/searchProperties?${query}`
    );

    // ✅ IMPORTANT FIX
    setProperties(res.data?.data || []);   // 🔥 main state update
    setTotalPages(res.data?.totalPages || 1);
    setPage(pageNumber);

  } catch (err) {
    console.log(err);
    setError3("Failed to fetch properties");
  } finally {
    setTypeLoading(false);
  }
};
  // ================= EFFECTS =================
  useEffect(() => {
    fetchProperties();
  }, [page, filters,propertyType]);

  useEffect(() => {
    fetchAllProperties();
  }, []);

  // ================= UPDATE FILTER =================
  const updateFilters = (newFilters) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <PropertyContext.Provider
      value={{
        // main
        properties,
        allProperties,
        loading,
        error,propertyType,setPropertyType,
fetchPropertiesByType,
typeLoading,
error3,
        page,
        setPage,
        totalPages,
        filters,
        updateFilters,

        // locality
        localityData,
        loading2,
        error2,
        fetchByLocality,
        setLocalityParams,
        dailyLimit,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error("Wrap inside Provider");
  return context;
};