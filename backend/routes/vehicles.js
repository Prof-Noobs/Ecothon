import express from "express";
import fs from "fs";
import path from "path";
import City from "../model/city.model.js";

const router = express.Router();

// Read vehicles.json once
const vehiclesFile = path.resolve("./data/vehicles.json");
const vehicles = JSON.parse(fs.readFileSync(vehiclesFile, "utf-8"));

// GET all vehicles
router.get("/", (req, res) => {
  res.json(vehicles);
});

// POST /calculate - single vehicle CO2
router.post("/calculate", async (req, res) => {
  try {
    let { vehicleId, dailyKm, years, city } = req.body;

    dailyKm = Number(dailyKm);
    years = Number(years);

    if (!vehicleId || !city) return res.status(400).json({ error: "vehicleId and city are required" });
    if (isNaN(dailyKm) || isNaN(years) || dailyKm <= 0 || years <= 0) {
      return res.status(400).json({ error: "Invalid dailyKm or years" });
    }

    const cityData = await City.findOne({ name: city });
    if (!cityData) return res.status(404).json({ error: "City not found" });

    const gridFactor = cityData.gridEmissionFactor;

    const vehicle = vehicles.find(v => v.vehicleId === vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    let totalCarbon = 0;

    if (vehicle.type === "petrol" || vehicle.type === "diesel") {
      totalCarbon = vehicle.manufacturingEmission + dailyKm * 365 * years * vehicle.emissionPerKm;
    } else if (vehicle.type === "ev") {
      const usage = dailyKm * 365 * years * vehicle.energyConsumptionPerKm * gridFactor;
      totalCarbon = vehicle.manufacturingEmission + vehicle.batteryEmission + usage;
    }

    res.json({ vehicle: vehicle.name, totalCarbon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /recommend - best vehicle
router.post("/recommend", async (req, res) => {
  try {
    let { dailyKm, years, city } = req.body;

    dailyKm = Number(dailyKm);
    years = Number(years);

    if (!city) return res.status(400).json({ error: "City is required" });
    if (isNaN(dailyKm) || isNaN(years) || dailyKm <= 0 || years <= 0) {
      return res.status(400).json({ error: "Invalid dailyKm or years" });
    }

    const cityData = await City.findOne({ name: city });
    if (!cityData) return res.status(404).json({ error: "City not found" });

    const gridFactor = cityData.gridEmissionFactor;

    const results = vehicles.map(vehicle => {
      let totalCarbon = 0;

      if (vehicle.type === "petrol" || vehicle.type === "diesel") {
        totalCarbon = vehicle.manufacturingEmission + dailyKm * 365 * years * vehicle.emissionPerKm;
      } else if (vehicle.type === "ev") {
        const usage = dailyKm * 365 * years * vehicle.energyConsumptionPerKm * gridFactor;
        totalCarbon = vehicle.manufacturingEmission + vehicle.batteryEmission + usage;
      }

      return { name: vehicle.name, type: vehicle.type, totalCarbon };
    });

    results.sort((a, b) => a.totalCarbon - b.totalCarbon);

    res.json({ recommended: results[0], comparison: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;