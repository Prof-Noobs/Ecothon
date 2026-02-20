const gridFactors = {
  Mumbai: 0.75,
  Bangalore: 0.6,
  Delhi: 0.82,
  Chennai: 0.7
};

function calculateCarbon(vehicle, dailyKm, years, city) {
  const totalKm = dailyKm * 365 * years;

  if (vehicle.type === "petrol") {
    return (
      vehicle.manufacturingEmission +
      totalKm * vehicle.emissionPerKm
    );
  }

  if (vehicle.type === "ev") {
    const electricityFactor = gridFactors[city] || 0.75;

    return (
      vehicle.manufacturingEmission +
      vehicle.batteryEmission +
      totalKm *
        vehicle.consumptionPerKm *
        electricityFactor
    );
  }
}

module.exports = calculateCarbon;