import express from "express";
import { calculateComparison } from "../controller/calculate.controller.js";

const router = express.Router();

router.post("/calculate", calculateComparison);

export default router;