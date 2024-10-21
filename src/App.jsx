import React, { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // fetch countries on component load
  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data); 
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((data) => {
          setStates(data); 
          // clear cities when country changes
          setCities([]); 
          // reset selected city
          setSelectedCity(""); 
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [selectedCountry]);

  // fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((data) => {
          setCities(data); 
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    // reset state when country changes
    setSelectedState(""); 
    // reset cities when country changes
    setCities([]); 
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    // reset city when state changes
    setSelectedCity(""); 
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>State Selection</h1>

     
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      
      <select
        id="state"
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

     
      <select
        id="city"
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCountry && selectedState && selectedCity && (
        <h4>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h4>
      )}
    </div>
  );
}

export default App;