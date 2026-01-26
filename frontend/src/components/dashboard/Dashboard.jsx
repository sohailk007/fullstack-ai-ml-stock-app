import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosinstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceChart, setPriceChart] = useState(null);
  const [emaChart, setEmaChart] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected/");
        console.log("Protected data:", response.data);
      } catch (err) {
        console.error("Error fetching protected data:", err);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    setLoading(true);
    setError(null);
    setPriceChart(null);
    setEmaChart(null);

    try {
      const response = await axiosInstance.post("/predict/", { ticker });
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;

      if (response.data?.error) {
        setError(response.data.error);
        return;
      }

      setPriceChart(`${backendRoot}${response.data.price_chart || response.data.plot_img}`);
      setEmaChart(`${backendRoot}${response.data.ema_chart || response.data.ema_plot_img}`);
    } catch (err) {
      console.error("Prediction error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* Input Card */}
          <div className="col-12 col-md-8 col-lg-6 text-center bg-light-dark p-4 rounded shadow">
            <h4 className="mb-3 text-light">Stock Prediction</h4>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Ticker Symbol (e.g., BTC-USD)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
              />

              {error && <div className="text-danger small">{error}</div>}

              <button
                type="submit"
                className="btn btn-info fw-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    Loading...
                  </>
                ) : (
                  "Predict"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Price Chart */}
        {priceChart && (
          <div className="row mt-5">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="card shadow p-3">
                <h6 className="mb-3 text-center">Price History</h6>
                <img
                  src={priceChart}
                  alt="Stock price chart"
                  className="img-fluid rounded"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* EMA Chart */}
        {emaChart && (
          <div className="row mt-4">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="card shadow p-3">
                <h6 className="mb-3 text-center">EMA Indicators</h6>
                <img
                  src={emaChart}
                  alt="Stock EMA chart"
                  className="img-fluid rounded"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default Dashboard;
