import Dog from "../models/dog.js";

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
    return res.status(200).json(dog);
  } catch (err) {
    next(err);
  }
}

async function createDog(req, res, next) {
  try {
    const newDog = await Dog.create(req.body);
    return res.status(201).json(newDog);
  } catch (err) {
    next(err);
  }
}

async function deleteDog(req, res, next) {
  const id = req.params.id;
  try {
    const removeDog = await Dog.findByIdAndDelete(id);
    return res.status(200).json(removeDog);
  } catch (err) {
    next(err);
  }
}

async function updateDog(req, res, next) {
  const id = req.params.id;
  try {
    const dog = await Dog.findByIdAndUpdate(id, req.body);
    return res.status(200).json(dog);
  } catch (err) {
    next(err);
  }
}

export default { getAllDogs, createDog, getDog, deleteDog, updateDog };
