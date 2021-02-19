module.exports = app => {
    const shistory = require("../controllers/shistory.controller.js");
  
    // Create a new history
    app.post("/shistory", shistory.create);
  
    // Retrieve all history
    app.get("/shistory", shistory.findAll);
  
    // Retrieve a single history with shistoryId
    app.get("/shistory/:shistoryId", shistory.findOne);
  
    // Update a history with shistoryId
    app.put("/shistory/:shistoryId", shistory.update);
  
    // Delete a history with shistoryId
    app.delete("/shistory/:shistoryId", shistory.delete);
  
    // Create a new history
    app.delete("/shistory", shistory.deleteAll);
  };