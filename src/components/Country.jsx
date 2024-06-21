import React, { useEffect, useState } from "react";
import { fetchCities, fetchCountries, fetchStates } from "./api/Api";

const Country = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  let fetchCountry = async () => {
    try {
      let response = await fetchCountries();
      setCountryData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountry();
  }, [country, state]);

  let fetchState = async (countryName) => {
    try {
      let response = await fetchStates(countryName);
      setStateData(response);
    } catch (error) {
      console.log(error);
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
      //   setCountry("");
      //   setState("");
      //   setCity("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (country && state) {
      fetchCity(country, state);
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
          console.log(e.target.value);
          console.log(country);
          setCountry(e.target.value);
          setState("");
          setCity("");
        }}
      >
        <option value="" defaultChecked>
          Select Country
        </option>
        {countryData && countryData.map((ele) => <option>{ele}</option>)}
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
      >
        <option value="" defaultChecked>
          Select City
        </option>
        {cityData && cityData.map((ele) => <option value={ele}>{ele}</option>)}
      </select>
      {country && state && city && (
        <p>
          You selected <b>{city}</b>, {state}, {country}
        </p>
      )}
    </div>
  );
};

export default Country;
