import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const dogSchema = new mongoose.Schema({
  breed: String,
  hairType: String,
  lifeSpan: Number,
  cost: Number,
});

dogSchema.plugin(mongooseUniqueValidator);

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;
