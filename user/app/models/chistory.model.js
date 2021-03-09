const sql = require("./db.js");

// constructor
const Chistory = function(chistory) {
  this.v_id = chistory.v_id;
  this.dev_id = chistory.dev_id;
  this.station_id = chistory.station_id;
  this.chg_start = chistory.chg_start;
  this.chg_end = chistory.chg_end;
  this.date = chistory.date;
  this.duration = chistory.duration;
  this.payment_type = chistory.payment_type;
};

Chistory.create = (newChistory, result) => {
  sql.query("INSERT INTO charging_history SET ?", newChistory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created chistory: ", { id: res.insertId, ...newChistory });
    result(null, { id: res.insertId, ...newChistory });
  });
};

Chistory.findById = (chistoryId, result) => {
  sql.query(`SELECT * FROM charging_history WHERE his_id = ${chistoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found chistory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Chistory with the id
    result({ kind: "not_found" }, null);
  });
};

Chistory.getAll = result => {
  sql.query("SELECT * FROM charging_history", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("charging_history: ", res);
    result(null, res);
  });
};

Chistory.updateById = (id, chistory, result) => {
  sql.query(
    "UPDATE charging_history SET v_id = ?, dev_id = ?, station_id = ?, chg_start = ?, chg_end = ?, date = ?, duration = ?, payment_type = ? WHERE his_id = ?",
    [chistory.v_id,chistory.dev_id, chistory.station_id, chistory.chg_start,chistory.chg_end,chistory.date,chistory.duration,chistory.payment_type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Chistory with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated chistory: ", { id: id, ...chistory });
      result(null, { id: id, ...chistory });
    }
  );
};

Chistory.remove = (id, result) => {
  sql.query("DELETE FROM charging_history WHERE his_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Chistory with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted chistory with id: ", id);
    result(null, res);
  });
};

Chistory.removeAll = result => {
  sql.query("DELETE FROM charging_history", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    
    console.log(`deleted ${res.affectedRows} charging_history`);
    result(null, res);
  });
};

module.exports = Chistory;