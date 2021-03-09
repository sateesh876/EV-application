const sql = require("./db.js");

// constructor
const Shistory = function(shistory) {
  this.dev_id = shistory.dev_id;
  this.search_string = shistory.search_string;
  this.search_date = shistory.search_date;
};

Shistory.create = (newShistory, result) => {
  sql.query("INSERT INTO search_history SET ?", newShistory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    console.log("created shistory: ", { id: res.insertId, ...newShistory });
    result(null, { id: res.insertId, ...newShistory });
  });
};

Shistory.findById = (shistoryId, result) => {
  sql.query(`SELECT * FROM search_history WHERE search_id = ${shistoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shistory: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Shistory with the id
    result({ kind: "not_found" }, null);
  });
};

Shistory.getAll = result => {
  sql.query("SELECT * FROM search_history", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("search_history: ", res);
    result(null, res);
  });
};

Shistory.updateById = (id, shistory, result) => {
  sql.query(
    "UPDATE search_history SET dev_id = ?, search_string = ?, search_date = ? WHERE search_id = ?",
    [shistory.dev_id, shistory.search_string, shistory.search_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shistory with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shistory: ", { id: id, ...shistory });
      result(null, { id: id, ...shistory });
    }
  );
};

Shistory.remove = (id, result) => {
  sql.query("DELETE FROM search_history WHERE search_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Shistory with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shistory with id: ", id);
    result(null, res);
  });
};

Shistory.removeAll = result => {
  sql.query("DELETE FROM search_history", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} search_history`);
    result(null, res);
  });
};

module.exports = Shistory;