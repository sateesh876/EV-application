const Shistory = require("../models/shistory.model.js");

// Create and Save a new Shistory
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Shistory
    const shistory = new Shistory({
      dev_id: req.body.dev_id,
      search_string: req.body.search_string,
      search_date: req.body.search_date
    });
  
    // Save Shistory in the database
    Shistory.create(shistory, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Shistory."
        });
      else res.send(data);
    });
  };

// Retrieve all Shistory's from the database.
exports.findAll = (req, res) => {
    Shistory.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shistory's."
        });
      else res.send(data);
    });
  };

// Find a single Shistory with a shistoryId
exports.findOne = (req, res) => {
    Shistory.findById(req.params.shistoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Shistory with id ${req.params.shistoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Shistory with id " + req.params.shistoryId
          });
        }
      } else res.send(data);
    });
  };

// Update a Shistory identified by the shistoryId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Shistory.updateById(
      req.params.shistoryId,
      new Shistory(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Shistory with id ${req.params.shistoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Shistory with id " + req.params.shistoryId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Shistory with the specified shistoryId in the request
exports.delete = (req, res) => {
    Shistory.remove(req.params.shistoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Shistory with id ${req.params.shistoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Shistory with id " + req.params.shistoryId
          });
        }
      } else res.send({ message: `Shistory was deleted successfully!` });
    });
  };

// Delete all Shistory's from the database.
exports.deleteAll = (req, res) => {
    Shistory.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all shistory's."
        });
      else res.send({ message: `All Shistory's were deleted successfully!` });
    });
  };