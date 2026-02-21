// utils/loadPetrolCars.js
const fs = require("fs");
const csv = require("csv-parser");

function loadPetrolCars() {
  return new Promise((resolve, reject) => {
    const cars = [];
    fs.createReadStream("data/epa_cars.csv")
      .pipe(csv())
      .on("data", (row) => {
        cars.push({
          name: row.Model,
          type: row.FuelType.toLowerCase(),
          mileage: Number(row.Mileage),
          emissionPerKm: Number(row.CO2_g_km),
          price: Number(row.PriceINR),
          manufacturingEmission: 6000 // average manufacturing kg CO₂
        });
      })
      .on("end", () => resolve(cars))
      .on("error", (err) => reject(err));
  });
}

module.exports = loadPetrolCars;