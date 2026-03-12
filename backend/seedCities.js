import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "./model/vehicle.model.js";

dotenv.config();

async function fetchCars() {

  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    console.log("Fetching car data from CarQuery API...");

    const carRes = await axios.get(
      "https://www.carqueryapi.com/api/0.3/?cmd=getTrims&year=2022"
    );

    const cars = carRes.data.Trims.slice(0, 20);

    console.log("Fetching currency data for price calculation...");

    const rateRes = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const usdToInr = rateRes.data.rates.INR;

    const vehicles = [];

    for (let car of cars) {

      const name = `${car.make_display} ${car.model_name}`;

      const weightKg = Number(car.model_weight_kg) || 1500;

      const engineSize = Number(car.model_engine_cc) || 1500;

      const vehicleType =
        engineSize < 1000 ? "ev" : "petrol";

      const baseUSD =
        20000 + (engineSize * 0.5);

      const price =
        Math.round(baseUSD * usdToInr);

      const batteryCapacity =
        Math.round(weightKg * 0.03);

      const range =
        Math.round(batteryCapacity * 6);

      const mileage =
        Math.round(25 - (engineSize / 1000));

      const vehicle = {

        vehicleId:
          name.toLowerCase().replace(/\s+/g, "-"),

        name: name,

        type: vehicleType,

        price: price,

        mileage: vehicleType === "petrol" ? mileage : undefined,

        energyConsumptionPerKm:
          vehicleType === "ev"
            ? batteryCapacity / range
            : undefined,

        emissionPerKm:
          vehicleType === "petrol"
            ? 0.16 + Math.random() * 0.05
            : undefined,

        manufacturingEmission:
          weightKg * 6,

        batteryEmission:
          vehicleType === "ev"
            ? batteryCapacity * 80
            : undefined
      };

      vehicles.push(vehicle);
    }

    await Vehicle.insertMany(vehicles, { ordered: false });

    console.log(`${vehicles.length} vehicles inserted from APIs`);

    process.exit();

  } catch (error) {

    console.error("ERROR:", error.message);

    process.exit(1);
  }
}

fetchCars();
