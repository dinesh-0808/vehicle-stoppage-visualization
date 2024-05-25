import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./components/MapComponent";
import { identifyStoppages } from "./services/gpsDataService";
import gpsData from "./api/gpsData.json"; // Import the local JSON data
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(5); // Default threshold in minutes

  useEffect(() => {
    // Instead of fetching from API, use the imported JSON data
    const data = gpsData;
    setData(data);

    // Identify stoppages
    const identifiedStoppages = identifyStoppages(data, threshold);
    setStoppages(identifiedStoppages);
  }, [threshold]);

  return (
    <div className="app-container">
      <div className="content-container">
        <h1>Vehicle Stoppage Visualization</h1>
        <label>
          Stoppage Threshold (minutes):
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </label>
        <br />
        <br />
        {data.length > 0 && (
          <MapComponent gpsData={data} stoppages={stoppages} />
        )}
      </div>
    </div>
  );
};

export default App;
