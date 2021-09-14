import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const commentSchema = new mongoose.Schema(
  {
    Text: { type: String, required: true, maxLength: 300 },
    DoggyLove: { type: Number, required: true, min: 1, max: 10 },
  },
  { timeStamps: true }
);

const dogSchema = new mongoose.Schema({
  breed: String,
  hairType: String,
  lifeSpan: Number,
  cost: Number,
  comments: [commentSchema],
});

dogSchema.plugin(mongooseUniqueValidator);

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;
