import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosinstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected/");
        console.log("Protected data:", response.data);
      } catch (error) {
        console.log("Error fetching protected data:", error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/predict/", { ticker });
      console.log("Prediction data:", response.data);
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      setPlot(plotUrl);

      if (response.data?.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.log("There was an error", error);
      setError(
        error.response?.data?.error ||
          error.response?.data?.detail ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-lg-5 mt-5 text-center bg-light-dark p-4 rounded shadow">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Ticker"
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            {error && <div className="text-danger mt-2">{error}</div>}
            <button
              type="submit"
              className="btn btn-info mt-3"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                </span>
              ) : (
                "Predict"
              )}
            </button>
          </form>
        </div>
        {/* Display plot if available */}
        {plot && (
          <div className="row mt-4">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="card shadow p-3">
                <img
                  src={plot}
                  alt="Stock Prediction Chart"
                  className="img-fluid rounded"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
