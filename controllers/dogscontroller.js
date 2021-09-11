export const getAllDogs = (request, response) => {
  return response.send(["husky", "collie", "german-shepard", "goldern-lab"]);
};
