const sql = require("./db.js");

// constructor
const User = function(user) {
  this.dev_id = user.dev_id;
  this.u_name = user.u_name;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user_details SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user_details WHERE u_id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM user_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user_details: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user_details SET dev_id = ?, u_name = ?, password = ? WHERE u_id = ?",
    [user.dev_id, user.u_name, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user_details WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM user_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user_details`);
    result(null, res);
  });
};

module.exports = User;