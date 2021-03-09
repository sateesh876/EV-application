const sql = require("./db.js");

// constructor
const Vehicle = function(vehicle) {
  this.v_name = vehicle.v_name;
  this.v_number = vehicle.v_number;
};

Vehicle.create = (newVehicle, result) => {
  sql.query("INSERT INTO vehicle_details SET ?", newVehicle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    console.log("created vehicle: ", { id: res.insertId, ...newVehicle });
    result(null, { id: res.insertId, ...newVehicle });
  });
};

Vehicle.findById = (vehicleId, result) => {
  sql.query(`SELECT * FROM vehicle_details WHERE v_id = ${vehicleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vehicle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Vehicle with the id
    result({ kind: "not_found" }, null);
  });
};

Vehicle.getAll = result => {
  sql.query("SELECT * FROM vehicle_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vehicle_details: ", res);
    result(null, res);
  });
};

Vehicle.updateById = (id, vehicle, result) => {
  sql.query(
    "UPDATE vehicle_details SET v_name = ?, v_number = ? WHERE v_id = ?",
    [vehicle.v_name, vehicle.v_number, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Vehicle with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vehicle: ", { id: id, ...vehicle });
      result(null, { id: id, ...vehicle });
    }
  );
};

Vehicle.remove = (id, result) => {
  sql.query("DELETE FROM vehicle_details WHERE v_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Vehicle with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vehicle with id: ", id);
    result(null, res);
  });
};

Vehicle.removeAll = result => {
  sql.query("DELETE FROM vehicle_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} vehicle_details`);
    result(null, res);
  });
};

module.exports = Vehicle;