import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  city: { type: String, required: true },
  avgKmPerDay: { type: Number, required: true },
  years: { type: Number, required: true },
  mileage: { type: Number, default: 18 },
  evEfficiency: { type: Number, default: 0.15 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("UserInput", userSchema);