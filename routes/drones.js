const express = require("express");
const router = express.Router();

// require the Drone model here

const Drone = require("./../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  const drones = await Drone.find({});
  res.render("drones/list", { drones });
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    const newDrone = await Drone.create({ name, propellers, maxSpeed });

    console.log(`New drone created: ${newDrone.name}.`);
    res.redirect("/drones");
  } catch (error) {
    next(error);
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  const drone = await Drone.findById(req.params.id);
  res.render("drones/update-form", { drone });
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    const { name, propellers, maxSpeed } = req.body;
    const drone = await Drone.findByIdAndUpdate(req.params.id, {
      name,
      propellers,
      maxSpeed,
    });
    res.redirect("/drones");
  } catch (error) {
    next(error);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  const deleteDrone = await Drone.findByIdAndDelete(id);
  res.redirect("/drones");
});

module.exports = router;
