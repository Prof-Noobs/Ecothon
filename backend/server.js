const express = require("express");
const cors = require("cors");

const vehiclesRoute = require("./routes/vehicles");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehiclesRoute);


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});