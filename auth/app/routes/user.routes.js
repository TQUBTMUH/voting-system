module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new Client
  app.post("/users", users.create);

  // Retrieve all Clients
  //app.get("/voters", voters.findAll);

  // Retrieve a single Client with voterId
  app.post("/getusers", users.findOne);

  // Update a Client with voterId
  app.post("/voteauth", users.voteauth);

  // Delete a Client with voterId
  //app.delete("/voters/:voterId", voters.delete);

  // Create a new Client
  app.delete("/users", users.deleteAll);
};
