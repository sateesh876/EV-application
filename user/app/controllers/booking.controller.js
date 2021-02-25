const Parts = require("../models/parts.model.js");

// Create and Save a new Parts
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Parts
    const parts = new Parts({
      parts_name: req.body.parts_name,
      part_manufacturer: req.body.part_manufacturer,
      part_price: req.body.part_price
    });
  
    // Save Parts in the database
    Parts.create(parts, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Parts."
        });
      else res.send(data);
    });
  };

// Retrieve all Parts's from the database.
exports.findAll = (req, res) => {
    Parts.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving parts's."
        });
      else res.send(data);
    });
  };

// Find a single Parts with a partsId
exports.findOne = (req, res) => {
    Parts.findById(req.params.partsId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Parts with id ${req.params.partsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Parts with id " + req.params.partsId
          });
        }
      } else res.send(data);
    });
  };

// Update a Parts identified by the partsId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Parts.updateById(
      req.params.partsId,
      new Parts(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Parts with id ${req.params.partsId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Parts with id " + req.params.partsId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Parts with the specified partsId in the request
exports.delete = (req, res) => {
    Parts.remove(req.params.partsId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Parts with id ${req.params.partsId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Parts with id " + req.params.partsId
          });
        }
      } else res.send({ message: `Parts was deleted successfully!` });
    });
  };

// Delete all Parts's from the database.
exports.deleteAll = (req, res) => {
    Parts.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all parts's."
        });
      else res.send({ message: `All Parts's were deleted successfully!` });
    });
  };