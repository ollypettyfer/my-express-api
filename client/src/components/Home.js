import React, { useState, useEffect } from "react";
import { getAllDogs } from "../api/dogs.js";

const Home = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getAllDogs().then((dogs) => setDogs(dogs));
  }, []);

  return (
    <>
      <h1> Hello DOGS</h1>
      {
        <section className="title is-parent">
          {dogs.map((dog) => (
            <div className="title is-child is-primary" key={dog._id}>
              <h2 className="title">
                {dog.breed} ({dog.cost})
              </h2>
              <p className="subtitle">{dog.hairType}</p>
              {dog.comments.map((comment) => (
                <p className="button">{comment.text}</p>
              ))}
            </div>
          ))}
        </section>
      }
    </>
  );
};

export default Home;
