const sql = require("./db.js");

// constructor
const Device = function(device) {
  this.dev_name = device.dev_name;
  this.start_time = device.start_time;
  this.end_time = device.end_time;
};

Device.create = (newDevice, result) => {
  sql.query("INSERT INTO devices_table SET ?", newDevice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created device: ", { id: res.insertId, ...newDevice });
    result(null, { id: res.insertId, ...newDevice });
  });
};

Device.findById = (userId, result) => {
  sql.query(`SELECT * FROM devices_table WHERE dev_id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found device: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Device with the id
    result({ kind: "not_found" }, null);
  });
};

Device.getAll = result => {
  sql.query("SELECT * FROM devices_table", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("devices_table: ", res);
    result(null, res);
  });
};

Device.updateById = (id, device, result) => {
  sql.query(
    "UPDATE devices_table SET dev_name = ?, start_time = ?, end_time = ? WHERE dev_id = ?",
    [device.dev_name, device.start_time,device.end_time, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Device with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated device: ", { id: id, ...device });
      result(null, { id: id, ...device });
    }
  );
};

Device.remove = (id, result) => {
  sql.query("DELETE FROM devices_table WHERE dev_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Device with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted device with id: ", id);
    result(null, res);
  });
};

Device.removeAll = result => {
  sql.query("DELETE FROM devices_table", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} devices_table`);
    result(null, res);
  });
};

module.exports = Device;