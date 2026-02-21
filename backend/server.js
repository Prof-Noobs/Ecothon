// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import calculateRoutes from "./routes/calculate.route.js";
// const express = require("express");
// const cors = require("cors");

// const vehiclesRoute = require("./routes/vehicles");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/vehicles", vehiclesRoute);


// const PORT = 3002;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import calculateRoutes from "./routes/calculate.route.js";
import vehiclesRoutes from "./routes/vehicles.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", calculateRoutes);
app.use("/api/vehicles", vehiclesRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});