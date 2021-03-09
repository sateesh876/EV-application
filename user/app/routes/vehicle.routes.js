module.exports = app => {
    const vehicles = require("../controllers/vehicle.controller.js");
  
    // Create a new Vehicle
    app.post("/vehicles", vehicles.create);
  
    // Retrieve all Vehicles
    app.get("/vehicles", vehicles.findAll);
  
    // Retrieve a single Vehicle with vehicleId
    app.get("/vehicles/:vehicleId", vehicles.findOne);
  
    // Update a Vehicle with vehicleId
    app.put("/vehicles/:vehicleId", vehicles.update);
  
    // Delete a Vehicle with vehicleId
    app.delete("/vehicles/:vehicleId", vehicles.delete);
  
    
    // Create a new Vehicle
    app.delete("/vehicles", vehicles.deleteAll);
  };