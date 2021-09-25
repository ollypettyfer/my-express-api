import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const colourSchema = new mongoose.Schema({
  colour: { type: String, required: true },
  dogs: [{ type: mongoose.Types.ObjectId, ref: "Dogs" }],
});

colourSchema.plugin(mongooseUniqueValidator);

const Colour = mongoose.model("Colour", colourSchema);

export default Colour;
