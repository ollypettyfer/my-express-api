import axios from "axios";

export const getAllDogs = async () => {
  const options = { method: "GET", url: "/api/dogs" };
  const { data } = await axios.request(options);

  console.log(options, data);
  return data;
};
