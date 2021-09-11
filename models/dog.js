import { Mongoose } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const dogSchema = new Mongoose.Schema({
  breed: String,
  hairType: String,
  lifeSpan: Number,
  cost: Number,
});

dogSchema.plugin(mongooseUniqueValidator);

const Dog = Mongoose.model("dog", dogSchema);

export default Dog;
