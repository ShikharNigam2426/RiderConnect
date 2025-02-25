import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import MapComponent from "./MapComponent";

const CreateRidePage = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [rideType, setRideType] = useState("Solo");
  const [maxRiders, setMaxRiders] = useState(1);
  const [showMap, setShowMap] = useState(true);
  const [startCoordinates, setStartCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });
  const [destinationCoordinates, setDestinationCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });


  const mapRef = useRef(null);
  const API_KEY = "pk.c08d4617cedabff7deb664bf446142d6";

  const fetchSuggestions = async (query, type) => {
    if (query.length < 2) return;
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${query}&limit=5&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (type === "start") {
        setStartSuggestions(data);
      } else {
        setDestSuggestions(data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  console.log(dateTime, rideType);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const start = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${startLocation}&limit=5&format=json`);
      const end = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${destination}&limit=5&format=json`);
      const starting = { lat: start.data[0].lat, lng: start.data[0].lon };
      const ending = { lat: end.data[0].lat, lng: end.data[0].lon };
      setStartCoordinates(starting);
      setDestinationCoordinates(ending);
      setShowMap(true);
      setTimeout(() => {
        mapRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <MainContainer>
      <Row>
        <FormWrapper>
          <Title>Create a Ride</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Starting Point</Label>
            <Input type="text" placeholder="Enter starting location" value={startLocation} onChange={(e) => {
              setStartLocation(e.target.value);
              fetchSuggestions(e.target.value, "start");
            }} />
            {startSuggestions.length > 0 && startLocation.length > 0 && (
              <SuggestionList>
                {startSuggestions.map((place, index) => (
                  <SuggestionItem key={index} onClick={() => {
                    setStartLocation(place.display_name);
                    setStartSuggestions([]);
                  }}>{place.display_name}</SuggestionItem>
                ))}
              </SuggestionList>
            )}

            <Label>Destination</Label>
            <Input type="text" placeholder="Enter destination" value={destination} onChange={(e) => {
              setDestination(e.target.value);
              fetchSuggestions(e.target.value, "dest");
            }} />
            {destSuggestions.length > 0 && destination.length > 0 && (
              <SuggestionList>
                {destSuggestions.map((place, index) => (
                  <SuggestionItem key={index} onClick={() => {
                    setDestination(place.display_name);
                    setDestSuggestions([]);
                  }}>{place.display_name}</SuggestionItem>
                ))}
              </SuggestionList>
            )}

            <Label>Date & Time</Label>
            <Input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} />

            <FlexWrapper>
              <div>
                <Label>Ride Type</Label>
                <Select onChange={(e) => setRideType(e.target.value)}>
                  <option value="Solo">Solo</option>
                  <option value="Group">Group</option>
                </Select>
              </div>
              <div>
                <Label>Max Riders</Label>
                <Input type="number" min="1" max="10" value={maxRiders} onChange={(e) => setMaxRiders(e.target.value)} />
              </div>
            </FlexWrapper>
            <SubmitButton type="submit">See Map</SubmitButton>
          </Form>
        </FormWrapper>
      </Row>
      <Row ref={mapRef}>
        <MapWrapper>
          {showMap && startCoordinates && destinationCoordinates && (
            <MapComponent startCoordinates={startCoordinates} destinationCoordinates={destinationCoordinates} startLocation={startLocation} destination={destination} />
          )}
        </MapWrapper>
      </Row>
    </MainContainer>
  );
};

export default CreateRidePage;

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: url('./assets/createRide.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px){
    flex-direction: column;
  }
`;

const Row = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: row;
  gap: 10px; /* 10px gap between Form and Map */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormWrapper = styled.div`
  width: 80%;
  padding: 20px;
  background: #33333362;
  border-radius: 10px;
  color: white;
  font-size: 1.2rem; /* Default font size */

  @media (max-width: 768px) {
    width: 80%;
    font-size: 0.9rem; /* Small screen pe font chhota */
  }
`;


const MapWrapper = styled.div`
  width: 85%;
  height: 70%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95%;
    height: 70%;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: #00bcd4;
  color: white;
  border: none;
  cursor: pointer;
`;

const SuggestionList = styled.ul`
  background: #444;
  padding: 5px;
  list-style: none;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 3px;
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid white;
  border-radius: 4px;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;
