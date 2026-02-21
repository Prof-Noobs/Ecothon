import City from "../model/city.model.js";

export const calculateComparison = async (req, res) => {
  try {
    const {
      city,
      avgKmPerDay,
      years,
      mileage = 18,
      evEfficiency = 0.15,
    } = req.body;

    const cityData = await City.findOne({ name: city });

    if (!cityData) {
      return res.status(404).json({ message: "City not found" });
    }

    const kmPerYear = avgKmPerDay * 365;

    const yearWiseData = [];

    let totalPetrolCost = 700000; // ₹7 lakh
    let totalEvCost = 1100000; // ₹11 lakh

    let totalPetrolCO2 = 6000; // kg CO₂ (manufacturing)
    let totalEvCO2 = 10000; // kg CO₂ (battery + car)

    for (let year = 1; year <= years; year++) {
      // ===== Petrol =====
      const fuelUsed = kmPerYear / mileage;
      const petrolCostYear = fuelUsed * cityData.petrolPrice;
      const petrolCO2PerKm = 0.2; // 200 g CO₂ per km (typical petrol car)
      const petrolCO2Year = kmPerYear * petrolCO2PerKm;

      // ===== EV =====
      const unitsUsed = kmPerYear * evEfficiency;
      const evCostYear = unitsUsed * cityData.electricityRate;
      const evCO2Year = unitsUsed * cityData.gridEmissionFactor;

      totalPetrolCost += petrolCostYear;
      totalEvCost += evCostYear;
      totalPetrolCO2 += petrolCO2Year;
      totalEvCO2 += evCO2Year;

      yearWiseData.push({
        year,
        petrolCost: totalPetrolCost,
        evCost: totalEvCost,
        petrolCO2: totalPetrolCO2,
        evCO2: totalEvCO2,
      });
    }

    const totalKm = kmPerYear * years;
    const savings = totalPetrolCost - totalEvCost;
    const carbonSaved = totalPetrolCO2 - totalEvCO2;

    const recommendation = totalEvCost < totalPetrolCost ? "EV" : "Petrol";

    res.json({
      totalKm,
      petrolCost: totalPetrolCost,
      evCost: totalEvCost,
      petrolCO2: totalPetrolCO2,
      evCO2: totalEvCO2,
      savings,
      carbonSaved,
      recommendation,
      yearWiseData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
