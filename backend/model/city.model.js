import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  petrolPrice: { type: Number, required: true }, // ₹ per litre
  electricityRate: { type: Number, required: true }, // ₹ per kWh
  gridEmissionFactor: { type: Number, required: true } // kg CO2 per kWh
});

export default mongoose.model("City", citySchema);