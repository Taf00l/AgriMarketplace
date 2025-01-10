// src/components/Location.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null); // لتخزين عنوان الـ IP
  const [geoData, setGeoData] = useState(null); // لتخزين بيانات الموقع الجغرافي
  const API_KEY = "at_BgPFMRAHR1bJ7CyE8VxyMOPIqDsNF";

  // جلب عنوان الـ IP
  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  // جلب بيانات الموقع الجغرافي بناءً على عنوان الـ IP
  const getGeoLocationData = async () => {
    if (!ip) return; // التأكد من وجود عنوان IP قبل الإرسال

    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ip}`
      );
      console.log(response.data); // طباعة الاستجابة لمراجعتها
      if (response.data && response.data.location) {
        setGeoData(response.data); // تعيين البيانات إذا كانت موجودة
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);

  return (
    <div className="location-card">
      <h3 className="location-title">Location Information</h3>
      {ip ? (
        <div className="location-details">
          <p>
            <strong>IP Address:</strong> {ip}
          </p>
          {geoData ? (
            <div className="geo-info">
              <p>
                <strong>Country:</strong> {geoData.location.country}
              </p>
              <p>
                <strong>Region:</strong> {geoData.location.region}
              </p>
            </div>
          ) : (
            <p>Loading geolocation data...</p>
          )}
        </div>
      ) : (
        <p>Loading IP address...</p>
      )}
    </div>
  );
};

export default Location;
