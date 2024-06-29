import React, { useEffect, useState } from "react";
import { fetchCities, fetchCountries, fetchStates } from "./api/Api";

const Country = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [disableState, setDisableState] = useState(true);
  const [disableCity, setDisableCity] = useState(true);

  let fetchCountry = async () => {
    try {
      let response = await fetchCountries();
      setCountryData(response);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  useEffect(() => {
    fetchCountry();
  }, []);

  let fetchState = async (countryName) => {
    try {
      let response = await fetchStates(countryName);
      setStateData(response);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  useEffect(() => {
    if (country) {
      fetchState(country);
    }
  }, [country]);

  let fetchCity = async (countryName, stateName) => {
    try {
      let response = await fetchCities(countryName, stateName);
      setCityData(response);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  useEffect(() => {
    if (country) {
      setDisableState(false);
    }
    if (country && state) {
      fetchCity(country, state);
      setDisableCity(false);
    }
  }, [country, state]);
  return (
    <div>
      <h1>Select Location </h1>
      <select
        name="country"
        id=""
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState("");
          setCity("");
        }}
      >
        <option value="" defaultChecked>
          Select Country
        </option>
        {countryData &&
          countryData.map((ele) => <option value={ele}>{ele}</option>)}
      </select>
      <select
        name="state"
        value={state}
        id=""
        onChange={(e) => {
          console.log(e.target.value);
          console.log(state);
          setState(e.target.value);
          setCity("");
        }}
        disabled={disableState}
      >
        <option value="" defaultChecked>
          Select State
        </option>
        {stateData &&
          stateData.map((ele) => <option value={ele}>{ele}</option>)}
      </select>
      <select
        name="city"
        value={city}
        id=""
        onChange={(e) => {
          console.log(e.target.value);
          console.log(city);
          setCity(e.target.value);
        }}
        disabled={disableCity}
      >
        <option value="" defaultChecked>
          Select City
        </option>
        {cityData && cityData.map((ele) => <option value={ele}>{ele}</option>)}
      </select>
      {country && state && city && (
        <div>
          <span style={{ fontSize: "22px", fontWeight: "700" }}>
            You selected{" "}
          </span>
          <span style={{ fontSize: "28px", fontWeight: "900" }}>{city}, </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "rgb(171,151,136)",
            }}
          >
            {state}, {country}
          </span>
        </div>
      )}
    </div>
  );
};

export default Country;
