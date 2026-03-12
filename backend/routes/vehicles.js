import express from "express";
import Vehicle from "../model/vehicle.model.js";
import City from "../model/city.model.js";

const router = express.Router();


// GET all vehicles from MongoDB
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /calculate - single vehicle CO2
router.post("/calculate", async (req, res) => {
  try {

    let { vehicleId, dailyKm, years, city } = req.body;

    dailyKm = Number(dailyKm);
    years = Number(years);

    if (!vehicleId || !city)
      return res.status(400).json({ error: "vehicleId and city are required" });

    if (isNaN(dailyKm) || isNaN(years) || dailyKm <= 0 || years <= 0)
      return res.status(400).json({ error: "Invalid dailyKm or years" });

    const cityData = await City.findOne({ name: city });
    if (!cityData)
      return res.status(404).json({ error: "City not found" });

    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle)
      return res.status(404).json({ error: "Vehicle not found" });

    const gridFactor = cityData.gridEmissionFactor;

    let totalCarbon = 0;

    if (vehicle.type === "petrol" || vehicle.type === "diesel") {

      totalCarbon =
        vehicle.manufacturingEmission +
        dailyKm * 365 * years * vehicle.emissionPerKm;

    } else if (vehicle.type === "ev") {

      const usage =
        dailyKm *
        365 *
        years *
        vehicle.energyConsumptionPerKm *
        gridFactor;

      totalCarbon =
        vehicle.manufacturingEmission +
        vehicle.batteryEmission +
        usage;
    }

    res.json({
      vehicle: vehicle.name,
      price: vehicle.price,
      totalCarbon
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// POST /recommend - best vehicle
router.post("/recommend", async (req, res) => {

  try {

    let { dailyKm, years, city, minPrice, maxPrice } = req.body;

    dailyKm = Number(dailyKm);
    years = Number(years);
    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);

    if (!city)
      return res.status(400).json({ error: "City is required" });

    if (isNaN(dailyKm) || isNaN(years) || dailyKm <= 0 || years <= 0)
      return res.status(400).json({ error: "Invalid dailyKm or years" });

    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < minPrice)
      return res.status(400).json({ error: "Invalid price range" });

    const cityData = await City.findOne({ name: city });
    if (!cityData)
      return res.status(404).json({ error: "City not found" });

    const gridFactor = cityData.gridEmissionFactor;

    // Fetch vehicles from MongoDB in price range
    const vehicles = await Vehicle.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });

    if (vehicles.length === 0)
      return res.status(404).json({ error: "No vehicles found in this price range" });

    const results = vehicles.map(vehicle => {

      let totalCarbon = 0;

      if (vehicle.type === "petrol" || vehicle.type === "diesel") {

        totalCarbon =
          vehicle.manufacturingEmission +
          dailyKm * 365 * years * vehicle.emissionPerKm;

      } else if (vehicle.type === "ev") {

        const usage =
          dailyKm *
          365 *
          years *
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
        price: vehicle.price,
        totalCarbon
      };

    });

    results.sort((a, b) => a.totalCarbon - b.totalCarbon);

    res.json({
      recommended: results[0],
      comparison: results
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: err.message });

  }
});

export default router;
