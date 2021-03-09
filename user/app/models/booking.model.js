const sql = require("./db.js");

// constructor
const Bookings = function(bookings) {
  this.u_id = bookings.u_id;
  this.parts_id = bookings.parts_id;
  this.num_of_parts = bookings.num_of_parts;
};

Bookings.create = (newPart, result) => {
  sql.query("INSERT INTO booking_parts SET ?", newPart, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    console.log("created bookings: ", { id: res.insertId, ...newPart });
    result(null, { id: res.insertId, ...newPart });
  });
};

Bookings.findById = (partsId, result) => {
  sql.query(`SELECT * FROM booking_parts WHERE parts_id = ${partsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found bookings: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Bookings with the id
    result({ kind: "not_found" }, null);
  });
};

Bookings.getAll = result => {
  sql.query("SELECT * FROM booking_parts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("booking_parts: ", res);
    result(null, res);
  });
};

Bookings.updateById = (id, bookings, result) => {
  sql.query(
    "UPDATE booking_parts SET u_id = ?, parts_id = ?, num_of_parts = ? WHERE parts_id = ?",
    [bookings.u_id,bookings.parts_id, bookings.num_of_parts,  id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Bookings with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bookings: ", { id: id, ...bookings });
      result(null, { id: id, ...bookings });
    }
  );
};

Bookings.remove = (id, result) => {
  sql.query("DELETE FROM booking_parts WHERE parts_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Bookings with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted bookings with id: ", id);
    result(null, res);
  });
};

Bookings.removeAll = result => {
  sql.query("DELETE FROM booking_parts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} booking_parts`);
    result(null, res);
  });
};

module.exports = Bookings;