import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

// Get all countries with limited fields
const getCountries = async () => {
  const response = await axios.get(`${API_URL}/all?fields=name,flags,capital,population,region`);
  return response.data;
};

// Get country details by name
const getCountryDetails = async (countryName) => {
  const response = await axios.get(`${API_URL}/name/${countryName}?fullText=true`);
  return response.data;
};

const countriesService = {
  getCountries,
  getCountryDetails,
};

export default countriesService;