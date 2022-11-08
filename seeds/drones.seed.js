const mongoose = require("mongoose");
const Drone = require("./../models/Drone.model");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

// drones
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Drone.create(drones)
      .then((createdDrones) => {
        console.log(createdDrones);
      })
      .catch((error) => console.error(error));
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

mongoose.connection.close(function () {
  console.log("Mongoose default connection closed");
});
