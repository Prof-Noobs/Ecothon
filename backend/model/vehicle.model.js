import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, unique: true },
  name: String,
  type: String,
  price: Number,
  energyConsumptionPerKm: Number,
  emissionPerKm: Number,
  manufacturingEmission: Number,
  batteryEmission: Number
});

export default mongoose.model("Vehicle", vehicleSchema);