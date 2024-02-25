import { Request, Response } from "express";
import { Coach } from "../models";
import { validationResult } from "express-validator";

// Todos los entrenadores
export const getAllCoaches = async function (req: Request, res: Response) {
  try {
    const entrenadores = await Coach.find();
    res.json(entrenadores);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Crear un nuevo entrenador
export const addCoach = async function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const entrenador = new Coach(req.body);
  try {
    const savedEntrenador = await entrenador.save();
    res.status(200).json(savedEntrenador);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Actualizar  entrenador
export const updateCoach = async function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCoach = await Coach.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true },
    );
    res.json(updatedCoach);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Eliminar un entrenador
export const deleteCoach = async function (req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await Coach.findByIdAndDelete(req.params._id);
    res.json({ message: "Coach deleted", _id: req.params._id });
  } catch (error) {
    res.status(500).send(error);
  }
};
