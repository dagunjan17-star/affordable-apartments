"use client";

import { useState, useEffect } from "react";

export function useClickLimit() {
  const [isLimited, setIsLimited] = useState(false);

  const DOMAIN_NAME = "www.affordableapartmentsingurgaon.com"; 

  const getDomainKey = () => `clicks_${DOMAIN_NAME.replace(/\./g, '_')}`;

  useEffect(() => {
    checkLimit();
  }, []);

  const getLimitConfig = () => {
    const todayMidnight = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    const fixedStartDate = new Date(2026, 5, 30).getTime(); 
    const diffDays = Math.floor((todayMidnight - fixedStartDate) / (1000 * 60 * 60 * 24)); 
    const MAX_CLICKS = (Math.max(0, diffDays) + 1) * 10;
    
    return { todayMidnight, MAX_CLICKS };
  };

  const checkLimit = () => {
    if (typeof window === "undefined") return;

    const domainKey = getDomainKey();
    const { todayMidnight, MAX_CLICKS } = getLimitConfig();
    
    let dailyData = JSON.parse(localStorage.getItem(domainKey));
    
    if (!dailyData || dailyData.date !== todayMidnight) {
      dailyData = { date: todayMidnight, count: 0 };
      localStorage.setItem(domainKey, JSON.stringify(dailyData));
    }

    setIsLimited(dailyData.count >= MAX_CLICKS);
  };

  const handlePropertyClick = (e) => {
    if (typeof window === "undefined") return true;

    const domainKey = getDomainKey();
    const { todayMidnight, MAX_CLICKS } = getLimitConfig();
    
    let dailyData = JSON.parse(localStorage.getItem(domainKey));
    
    if (!dailyData || dailyData.date !== todayMidnight) {
      dailyData = { date: todayMidnight, count: 0 };
    }

    if (dailyData.count >= MAX_CLICKS) {
      e?.preventDefault();
      // alert(`Limit Reached! Is website (${DOMAIN_NAME}) par aaj ki limit ${MAX_CLICKS} thi.`);
      return false;
    } else {
      dailyData.count += 1;
      localStorage.setItem(domainKey, JSON.stringify(dailyData));
      checkLimit(); 
      return true;
    }
  };

  return { handlePropertyClick, isLimited };
}