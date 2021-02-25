const Chistory = require("../models/chistory.model.js");

// Create and Save a new Chistory
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Chistory
    const chistory = new Chistory({
      v_id: req.body.v_id,
      dev_id: req.body.dev_id,
      station_id: req.body.station_id,
      chg_start: req.body.chg_start,
      chg_end: req.body.chg_end,
      date: req.body.date,
      duration: req.body.duration,
      payment_type: req.body.payment_type
    });
  
    // Save Chistory in the database
    Chistory.create(chistory, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Chistory."
        });
      else res.send(data);
    });
  };

// Retrieve all Chistory's from the database.
exports.findAll = (req, res) => {
    Chistory.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving chistory's."
        });
      else res.send(data);S
    });
  };

// Find a single Chistory with a chistoryId
exports.findOne = (req, res) => {
    Chistory.findById(req.params.chistoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Chistory with id ${req.params.chistoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Chistory with id " + req.params.chistoryId
          });
        }
      } else res.send(data);
    });
  };

// Update a Chistory identified by the chistoryId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Chistory.updateById(
      req.params.chistoryId,
      new Chistory(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Chistory with id ${req.params.chistoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Chistory with id " + req.params.chistoryId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Chistory with the specified chistoryId in the request
exports.delete = (req, res) => {
    Chistory.remove(req.params.chistoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Chistory with id ${req.params.chistoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Chistory with id " + req.params.chistoryId
          });
        }
      } else res.send({ message: `Chistory was deleted successfully!` });
    });
  };

// Delete all Chistory's from the database.
exports.deleteAll = (req, res) => {
    Chistory.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all chistory's."
        });
      else res.send({ message: `All Chistory's were deleted successfully!` });
    });
  };