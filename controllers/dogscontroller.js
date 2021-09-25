import Colour from "../models/colour.js";
import Dog from "../models/dog.js";
import { removedAdded } from "./helpers.js";

export const getAllDogs = async (request, response, next) => {
  try {
    const dogo = await Dog.find();

    return response.status(200).json(dogo);
  } catch (err) {
    next(err);
  }
};

async function getDog(req, res, next) {
  const id = req.params.id;
  try {
    const dog = await Dog.findById(id);
    if (!dog) {
      return res.status(404).send({ message: "dog does not exist" });
    }
    return res.status(200).json(dog);
  } catch (err) {
    next(err);
  }
}

async function createDog(req, res, next) {
  try {
    const newDog = await Dog.create(req.body);

    await Colour.updateMany(
      { _id: newDog.colour },
      { $push: { dogs: newDog._id } }
    );

    return res.status(201).json(newDog);
  } catch (err) {
    next(err);
  }
}

async function deleteDog(req, res, next) {
  const id = req.params.id;
  try {
    const removeDog = await Dog.findByIdAndDelete(id);
    if (!removeDog) {
      return res.status(404).send({ Message: "dog does not exist" });
    }
    const colourToRemove = removeDog.colour.map((colour) => colour.toString());

    await Dog.updateMany(
      { _id: colourToRemove },
      { $pull: { colours: removeDog._id } }
    );

    return res.status(200).json(removeDog);
  } catch (err) {
    next(err);
  }
}

async function updateDog(req, res, next) {
  const id = req.params.id;
  try {
    const dog = await Dog.findByIdAndUpdate(id);
    if (!dog) {
      return res.status(404).send({ message: "dog does not exist" });
    }

    const [removedColours, addedColours] = removedAdded(
      dog.colour.map((colour) => colour.toString()),
      req.body.colours
    );

    dog.set(req.body);

    const savedDog = dog.save();

    await Colour.updateMany(
      { _id: removedColours },
      { $pull: { colours: savedDog._id } }
    );

    await Colour.updateMany(
      { _id: addedColours },
      { $push: { colours: savedDog._id } }
    );

    return res.status(200).json(dog);
  } catch (err) {
    next(err);
  }
}

export default { getAllDogs, createDog, getDog, deleteDog, updateDog };
