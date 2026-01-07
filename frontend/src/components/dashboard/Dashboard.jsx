import React from "react";
import { useEffect } from "react";
import axiosInstance from "../../axiosinstance";

const Dashboard = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get(
          "/protected/"
        );
        console.log("Protected data:", response.data);
      } catch (error) {
        console.log("Error fetching protected data:", error);
      }
    };
    fetchProtectedData();
  }, []);
  return <div className="text-light container">Dashboard</div>;
};

export default Dashboard;
