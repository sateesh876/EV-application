const Station = require("../models/station.model.js");

// Create and Save a new Station
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Station
    const station = new Station({
      cstation_name : req.body.cstation_name,
      cs_latitude: req.body.cs_latitude,
      cs_longitude : req.body.cs_longitude,
      cs_address : req.body.cs_address,
      cs_city : req.body.cs_city,
      cs_district : req.body.cs_district,
      cs_landmark : req.body.cs_landmark,
      cs_pincode : req.body.cs_pincode,
      cs_opentime : req.body.cs_opentime,
      cs_status : req.body.cs_status,
      cs_closetime : req.body.cs_closetime,
      cs_type : req.body.cs_type
    });
  
    
    // Save Station in the database
    Station.create(station, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Station."
        });
      else res.send(data);
    });
  };

// Retrieve all Stations from the database.
exports.findAll = (req, res) => {
    Station.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving stations."
        });
      else res.send(data);
    });
  };

// Find a single Station with a stationId
exports.findOne = (req, res) => {
    Station.findById(req.params.stationId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Station with id ${req.params.stationId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Station with id " + req.params.stationId
          });
        }
      } else res.send(data);
    });
  };

// Update a Station identified by the stationId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Station.updateById(
      req.params.stationId,
      new Station(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Station with id ${req.params.stationId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Station with id " + req.params.stationId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Station with the specified stationId in the request
exports.delete = (req, res) => {
    Station.remove(req.params.stationId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Station with id ${req.params.stationId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Station with id " + req.params.stationId
          });
        }
      } else res.send({ message: `Station was deleted successfully!` });
    });
  };

// Delete all Stations from the database.
exports.deleteAll = (req, res) => {
    Station.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all stations."
        });
      else res.send({ message: `All Stations were deleted successfully!` });
    });
  };