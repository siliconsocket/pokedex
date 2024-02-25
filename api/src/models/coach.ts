import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  medals: { type: Number, required: true },
});

export default mongoose.model("Coach", coachSchema);
