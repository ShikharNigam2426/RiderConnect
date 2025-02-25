import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const API_KEY = "pk.c08d4617cedabff7deb664bf446142d6";

// Fix for invisible markers
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Auto-fit map to markers and polyline
const AutoFitBounds = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coordinates, map]);

  return null;
};

const MapComponent = ({ startCoordinates, destinationCoordinates, startLocation, destination }) => {
  const [route, setRoute] = useState([]); // 🔹 Store route coordinates

  useEffect(() => {
    const fetchRoute = async () => {
      if (!startCoordinates || !destinationCoordinates) return;

      try {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/directions/driving/${startCoordinates.lng},${startCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?key=${API_KEY}&overview=full&geometries=geojson`
        );

        const coordinates = response.data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute(coordinates);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [startCoordinates, destinationCoordinates]);

  return (
    <MapContainer
      center={[startCoordinates.lat, startCoordinates.lng]}
      zoom={10}
      style={{ height: "100%", width: "100%", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Auto-fit map to markers and polyline */}
      <AutoFitBounds coordinates={[...route, [startCoordinates.lat, startCoordinates.lng], [destinationCoordinates.lat, destinationCoordinates.lng]]} />

      {/* Start Location Marker */}
      <Marker position={[startCoordinates.lat, startCoordinates.lng]} icon={customIcon}>
        <Popup>{startLocation} (Start Point)</Popup>
      </Marker>

      {/* Destination Marker */}
      <Marker position={[destinationCoordinates.lat, destinationCoordinates.lng]} icon={customIcon}>
        <Popup>{destination} (Destination)</Popup>
      </Marker>

      {/* Draw Route */}
      {route.length > 0 && <Polyline positions={route} color="blue" weight={4} />}
    </MapContainer>
  );
};

export default MapComponent;
