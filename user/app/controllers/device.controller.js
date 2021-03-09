const Device = require("../models/device.model.js");

// Create and Save a new Device
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    // Create a Device
    const device = new Device({
      dev_name: req.body.dev_name,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    });
  
    // Save Device in the database
    Device.create(device, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Device."
        });
      else res.send(data);
    });
  };

// Retrieve all Devices from the database.
exports.findAll = (req, res) => {
    Device.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving devices."
        });
      else res.send(data);
    });
  };

// Find a single Device with a deviceId
exports.findOne = (req, res) => {
    Device.findById(req.params.deviceId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Device with id ${req.params.deviceId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Device with id " + req.params.deviceId
          });
        }
      } else res.send(data);
    });
  };

// Update a Device identified by the deviceId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Device.updateById(
      req.params.deviceId,
      new Device(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Device with id ${req.params.deviceId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Device with id " + req.params.deviceId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Device with the specified deviceId in the request
exports.delete = (req, res) => {
    Device.remove(req.params.deviceId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Device with id ${req.params.deviceId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Device with id " + req.params.deviceId
          });
        }
      } else res.send({ message: `Device was deleted successfully!` });
    });
  };

// Delete all Devices from the database.
exports.deleteAll = (req, res) => {
    Device.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all devices."
        });
      else res.send({ message: `All Devices were deleted successfully!` });
    });
  };