import Dog from "../models/dog.js";

async function createComment(req, res, next) {
  try {
    const id = req.params.id;
    const dog = await Dog.findById(id);
    console.log(id);
    if (!dog) {
      return res.status(401).send({ message: "dogs do not exist" });
    }
    dog.comments.push(req.body);

    const savedDog = await dog.save();
    return res.status(201).json(savedDog);
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id, commentId } = req.params;
    const dog = await Dog.findById(id);

    if (!dog) {
      return res.status(401).send({ message: "dogs do not exist" });
    }

    const comment = dog.comments.id(commentId);
    if (!comment) {
      return res.status(401).send({ message: "comment does not exist" });
    }
    comment.remove();
    const savedDog = await dog.save();
    return res.status(200).send(savedDog);
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  try {
    const { id, commentId } = req.params;
    const dog = await Dog.findById(id);

    if (!dog) {
      return res.status(401).send({ message: "dog does not exist" });
    }
    const comment = dog.comments.id(commentId);
    if (!comment) {
      return res.status(401).send({ message: "comment does not exist" });
    }
    comment.set(req.body);

    const savedDog = await dog.save();
    return res.status(200).send(savedDog);
  } catch (err) {
    next(err);
  }
}

export default { createComment, deleteComment, updateComment };
