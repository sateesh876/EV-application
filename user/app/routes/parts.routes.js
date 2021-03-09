module.exports = app => {
    const parts = require("../controllers/parts.controller.js");
  
    // Create a new part
    app.post("/parts", parts.create);
  
    // Retrieve all part
    app.get("/parts", parts.findAll);
  
    // Retrieve a single part with partsId
    app.get("/parts/:partsId", parts.findOne);
  
    // Update a part with partsId
    app.put("/parts/:partsId", parts.update);
  
    
    // Delete a part with partsId
    app.delete("/parts/:partsId", parts.delete);
  
    // Create a new part
    app.delete("/parts", parts.deleteAll);
  };