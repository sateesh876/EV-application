const sql = require("./db.js");

// constructor
const Parts = function(parts) {
  this.parts_name = parts.parts_name;
  this.part_manufacturer = parts.part_manufacturer;
  this.part_price = parts.part_price;
};

Parts.create = (newPart, result) => {
  sql.query("INSERT INTO accessories SET ?", newPart, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    console.log("created parts: ", { id: res.insertId, ...newPart });
    result(null, { id: res.insertId, ...newPart });
  });
};

Parts.findById = (partsId, result) => {
  sql.query(`SELECT * FROM accessories WHERE parts_id = ${partsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found parts: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Parts with the id
    result({ kind: "not_found" }, null);
  });
};

Parts.getAll = result => {
  sql.query("SELECT * FROM accessories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("accessories: ", res);
    result(null, res);
  });
};

Parts.updateById = (id, parts, result) => {
  sql.query(
    "UPDATE accessories SET parts_name = ?, part_manufacturer = ?, part_price = ? WHERE parts_id = ?",
    [parts.parts_name,parts.part_manufacturer, parts.part_price,  id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Parts with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated parts: ", { id: id, ...parts });
      result(null, { id: id, ...parts });
    }
  );
};

Parts.remove = (id, result) => {
  sql.query("DELETE FROM accessories WHERE parts_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Parts with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted parts with id: ", id);
    result(null, res);
  });
};

Parts.removeAll = result => {
  sql.query("DELETE FROM accessories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} accessories`);
    result(null, res);
  });
};

module.exports = Parts;