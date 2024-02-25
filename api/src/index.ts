import express from "express";
const cors = require("cors");
import "dotenv/config";
import { connectDB } from "./config/";
connectDB();

import { coachesRoutes, pokemonsRoutes } from "./routes/";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

// Rutas para la API de Pokemons
app.use("/api/pokemons", pokemonsRoutes);

// Rutas para la API de Entrenadores
app.use("/api/coaches", coachesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
