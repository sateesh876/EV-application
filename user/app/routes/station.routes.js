module.exports = app => {
    const stations = require("../controllers/station.controller.js");
  
    // Create a new Station
    app.post("/stations", stations.create);
  
    // Retrieve all Stations
    app.get("/stations", stations.findAll);
  
    // Retrieve a single Station with stationId
    app.get("/stations/:stationId", stations.findOne);
  
    // Update a Station with stationId
    app.put("/stations/:stationId", stations.update);
  
    // Delete a Station with stationId
    app.delete("/stations/:stationId", stations.delete);
  
    // Create a new Station
    app.delete("/stations", stations.deleteAll);
  };