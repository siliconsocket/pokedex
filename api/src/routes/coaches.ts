import { Router } from "express";
import {
  addCoach,
  deleteCoach,
  getAllCoaches,
  updateCoach,
} from "../controllers";
import { body, param } from "express-validator";
import mongoose from "mongoose";

const router = Router();

// Listar todos los entrenadores
router.get("/", getAllCoaches);

// Crear un nuevo entrenador
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("El nombre es requerido"),
    body("lastname").not().isEmpty().withMessage("El apellido es requerido"),
    body("phone")
      .matches(/^\+?\d{10,15}$/)
      .withMessage("Número de teléfono inválido"),
    body("medals")
      .isInt({ min: 0 })
      .withMessage("La cantidad de medallas debe ser un número positivo"),
  ],
  addCoach,
);

// Actualizar un entrenador
router.patch(
  "/:_id",
  [
    param("_id").not().isEmpty().withMessage("El id es requerido"),
    body("name").not().isEmpty().withMessage("El nombre es requerido"),
    body("lastname").not().isEmpty().withMessage("El apellido es requerido"),
    body("phone")
      .matches(/^\+?\d{10,15}$/)
      .withMessage("Número de teléfono inválido"),
    body("medals")
      .isInt({ min: 0 })
      .withMessage("La cantidad de medallas debe ser un número positivo"),
  ],
  updateCoach,
);

// Eliminar un entrenador
router.delete(
  "/:_id",
  [
    param("_id").custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("El ID proporcionado no es válido");
      }
      return true;
    }),
  ],
  deleteCoach,
);

export default router;
