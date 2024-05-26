import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./components/MapComponent";
import { identifyStoppages } from "./services/gpsDataService";
import gpsData from "./api/gpsData.json";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(5);

  useEffect(() => {
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
            min="0"
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
