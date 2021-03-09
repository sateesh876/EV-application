module.exports = app => {
    const chistory = require("../controllers/chistory.controller.js");
  
    // Create a new history
    app.post("/chistory", chistory.create);
  
    // Retrieve all history
    app.get("/chistory", chistory.findAll);
  
    // Retrieve a single history with chistoryId
    app.get("/chistory/:chistoryId", chistory.findOne);
  
    // Update a history with chistoryId
    app.put("/chistory/:chistoryId", chistory.update);
  
    // Delete a history with chistoryId
    app.delete("/chistory/:chistoryId", chistory.delete);
  
    
    // Create a new history
    app.delete("/chistory", chistory.deleteAll);
  };