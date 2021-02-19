const sql = require("./db.js");

// constructor
const Station = function(station) {
  this.cstation_name = station.cstation_name;
  this.cs_latitude   = station.cs_latitude;
  this.cs_longitude  = station.cs_longitude;
  this.cs_address    = station.cs_address;
  this.cs_city       = station.cs_city;
  this.cs_district   = station.cs_district;
  this.cs_landmark   = station.cs_landmark;
  this.cs_pincode    = station.cs_pincode;
  this.cs_opentime   = station.cs_opentime;
  this.cs_status     = station.cs_status;
  this.cs_closetime  = station.cs_closetime;
  this.cs_type       = station.cs_type;
};

Station.create = (newStation, result) => {
  sql.query("INSERT INTO cstation_details SET ?", newStation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created station: ", { id: res.insertId, ...newStation });
    result(null, { id: res.insertId, ...newStation });
  });
};

Station.findById = (stationId, result) => {
  sql.query(`SELECT * FROM cstation_details WHERE cstation_id = ${stationId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found station: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Station with the id
    result({ kind: "not_found" }, null);
  });
};

Station.getAll = result => {
  sql.query("SELECT * FROM cstation_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cstation_details: ", res);
    result(null, res);
  });
};

Station.updateById = (id, station, result) => {
  sql.query(
    "UPDATE cstation_details SET cstation_name = ?, cs_latitude = ?, cs_longitude = ?, cs_address = ?, cs_city = ?, cs_district = ?, cs_landmark = ?, cs_pincode = ?, cs_opentime = ?, cs_status = ?, cs_closetime = ?, cs_type = ? WHERE cstation_id = ?",
    [station.cstation_name, station.cs_latitude, station.cs_longitude,station.cs_address,station.cs_city,station.cs_district,station.cs_landmark,station.cs_pincode,station.cs_opentime,station.cs_status,station.cs_closetime,station.cs_type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Station with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated station: ", { id: id, ...station });
      result(null, { id: id, ...station });
    }
  );
};

Station.remove = (id, result) => {
  sql.query("DELETE FROM cstation_details WHERE cstation_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Station with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted station with id: ", id);
    result(null, res);
  });
};

Station.removeAll = result => {
  sql.query("DELETE FROM cstation_details", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cstation_details`);
    result(null, res);
  });
};

module.exports = Station;