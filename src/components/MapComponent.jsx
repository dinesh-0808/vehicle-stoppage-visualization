import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({ gpsData, stoppages }) => {
  const position = [gpsData[0].latitude, gpsData[0].longitude];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline
        positions={gpsData.map((point) => [point.latitude, point.longitude])}
        color="blue"
      />
      {stoppages.map((stoppage, index) => (
        <Marker key={index} position={[stoppage.latitude, stoppage.longitude]}>
          <Popup>
            <div>
              <p>
                <strong>Reach Time:</strong>{" "}
                {new Date(stoppage.reachTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(stoppage.endTime).toLocaleString()}
              </p>
              <p>
                <strong>Duration:</strong> {stoppage.duration} minutes
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
