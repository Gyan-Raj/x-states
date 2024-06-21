import axios from "axios";
export const fetchCountries = async () => {
  try {
    let response = await axios.get(
      "https://crio-location-selector.onrender.com/countries"
    );
    // console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchStates = async (countryName) => {
  try {
    let response = await axios.get(
      ` https://crio-location-selector.onrender.com/country=${countryName}/states`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchCities = async (countryName, stateName) => {
  try {
    let response = await axios.get(
      ` https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
