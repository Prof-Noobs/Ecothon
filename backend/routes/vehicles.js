const express = require("express");
const router = express.Router();
const vehicles = require("../data/vehicles.json");



router.get("/", (req, res) => {
  res.send(vehicles);
});

router.post("/calculate", (req, res) => {
  const { vehicleId, dailyKm, years, gridFactor } = req.body;

   dailyKm = Number(dailyKm);
  years = Number(years);
  gridFactor = Number(gridFactor);

  if (
    isNaN(dailyKm) ||
    isNaN(years) ||
    isNaN(gridFactor)
  ) {
    return res.status(400).json({
      error: "Inputs must be valid numbers"
    });
  }

  if (dailyKm <= 0 || years <= 0) {
    return res.status(400).json({
      error: "Daily KM and Years must be greater than 0"
    });
  }

  if (gridFactor <= 0 || gridFactor > 2) {
    return res.status(400).json({
      error: "Invalid grid emission factor"
    });
  }

  const vehicle = vehicles.find(v => v.vehicleId === vehicleId);

  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  let totalCarbon = 0;

  if (vehicle.type === "petrol" || vehicle.type === "diesel") {
    totalCarbon =
      vehicle.manufacturingEmission +
      dailyKm * 365 * years * vehicle.emissionPerKm;
  }

  if (vehicle.type === "ev") {
    const usage =
      dailyKm * 365 * years *
      vehicle.energyConsumptionPerKm *
      gridFactor;

    totalCarbon =
      vehicle.manufacturingEmission +
      vehicle.batteryEmission +
      usage;
  }

  res.json({
    vehicle: vehicle.name,
    totalCarbon
  });
});

router.post("/recommend", (req, res) => {

  let { dailyKm, years, gridFactor } = req.body;


  dailyKm = Number(dailyKm);
  years = Number(years);
  gridFactor = Number(gridFactor);

  if (
    isNaN(dailyKm) ||
    isNaN(years) ||
    isNaN(gridFactor)
  ) {
    return res.status(400).json({
      error: "Inputs must be valid numbers"
    });
  }

  if (dailyKm <= 0 || years <= 0) {
    return res.status(400).json({
      error: "Daily KM and Years must be greater than 0"
    });
  }

  if (gridFactor <= 0 || gridFactor > 2) {
    return res.status(400).json({
      error: "Invalid grid emission factor"
    });
  }

  const results = vehicles.map(vehicle => {
    let totalCarbon = 0;

    if (vehicle.type === "petrol" || vehicle.type === "diesel") {
      totalCarbon =
        vehicle.manufacturingEmission +
        dailyKm * 365 * years * vehicle.emissionPerKm;
    }

    if (vehicle.type === "ev") {
      const usage =
        dailyKm * 365 * years *
        vehicle.energyConsumptionPerKm *
        gridFactor;

      totalCarbon =
        vehicle.manufacturingEmission +
        vehicle.batteryEmission +
        usage;
    }

    return {
      name: vehicle.name,
      type: vehicle.type,
      totalCarbon
    };
  });

  results.sort((a, b) => a.totalCarbon - b.totalCarbon);

  res.json({
    recommended: results[0],
    comparison: results
  });
});

module.exports = router;