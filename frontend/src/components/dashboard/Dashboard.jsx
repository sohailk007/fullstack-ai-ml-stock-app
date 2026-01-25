import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosinstance";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
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
  return (
    <div className="container">
      <div className="row"> 
        <div className="col-md-6 mx-auto mt-lg-5 mt-5 text-center
        bg-light-dark p-4 rounded shadow">
          <form>
            <input type="text" className='form-control' placeholder="Enter the Ticker" 
            onChange={(e) => setTicker(e.target.value)} required/>
          </form>
          <button type="submit" className="btn btn-info mt-3" >See Prediction</button>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
