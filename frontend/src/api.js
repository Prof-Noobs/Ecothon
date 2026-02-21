// api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/vehicles";

export const calculateVehicle = async (vehicleId, dailyKm, years, city) => {
  const res = await axios.post(`${BASE_URL}/calculate`, { vehicleId, dailyKm, years, city });
  return res.data;
};

export const recommendVehicle = async (dailyKm, years, city) => {
  const res = await axios.post(`${BASE_URL}/recommend`, { dailyKm, years, city });
  return res.data;
};

export const getVehicles = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};