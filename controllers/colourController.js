import Colour from "../models/colour.js";
import Dog from "../models/dog.js";
import { removedAdded } from "./helpers.js";

async function getAllColours(_req, res, next) {
  try {
    const colour = await Colour.find();
    return res.status(200).json(colour);
  } catch (err) {
    next(err);
  }
}

async function getAllDogsForColours(req, res, next) {
  try {
    const { id } = req.params;
    const colour = await Colour.findById(id).populate("dogs");
    return res.status(200).json(colour.dogs);
  } catch (err) {
    next(err);
  }
}

async function createColour(req, res, next) {
  try {
    const newColour = await Colour.create(req.body);
    await Dog.updateMany(
      ({ _id: newColour.dog }, { $push: { colours: newColour._id } })
    );
    return res.status(201).json(newColour);
  } catch (err) {
    next(err);
  }
}

async function getColour(req, res, next) {
  const id = req.params.id;
  try {
    const findByColour = await Colour.findById(id);
    return res.status(200).json(findByColour);
  } catch (err) {
    next(err);
  }
}

async function deleteColour(req, res, next) {
  const id = req.params.id;
  try {
    const removeColour = await Colour.findByIdAndDelete(id);
    if (!removeColour) {
      return res.status(401).send({ message: "colour not found" });
    }

    const dogsToRemove = removeColour.removeDog.map((dog) => dog.toString());

    await Dog.updateMany(
      { _id: dogsToRemove },
      { $pull: { colour: removeColour._id } }
    );

    return res.status(200).json(removeColour);
  } catch (err) {
    next(err);
  }
}

async function updateColour(req, res, next) {
  const id = req.params.id;
  try {
    const changeColour = await Colour.findById(id);
    if (!changeColour) {
      return res.status(404).send({ message: "colour not found" });
    }

    const [removedDog, addedDog] = removedAdded(
      changeColour.dog.map((dog) => dog.toString()),
      req.body.dog
    );
    changeColour.set(req.body);

    const savedColour = await changeColour.save();

    await Dog.updateMany(
      { _id: removedDog },
      { $pull: { colours: changeColour._id } }
    );
    await Dog.updateMany(
      { _id: addedDog },
      { $push: { colours: savedColour._id } }
    );

    return res.status(200).json(changeColour);
  } catch (err) {
    next(err);
  }
}
export default {
  getAllColours,
  getAllDogsForColours,
  getColour,
  deleteColour,
  updateColour,
  createColour,
};
