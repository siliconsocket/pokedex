import { Router } from "express";
import { getPokemonByName, getPokemons } from "../controllers/";

const router = Router();

// Obtener lista de pokemons con paginación
router.get("/", getPokemons);

// Obtener pokemon por nombre (para búsqueda)
router.get("/:name", getPokemonByName);

export default router;
