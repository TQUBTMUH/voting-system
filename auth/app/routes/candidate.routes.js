module.exports = app => {
  const candidates = require("../controllers/candidate.controller.js");

  // Create a new Candidate
  app.post("/candidates", candidates.create);

  // Retrieve all Candidates
  app.get("/candidates", candidates.findAll);

  // Retrieve a single Customer with customerId
  app.get("/candidates/:candidateId", candidates.findOne);

  // Update a Candidate with customerId
  app.put("/candidates/:candidateId", candidates.update);

  // Delete a Candidate with customerId
  app.delete("/candidates/:candidateId", candidates.delete);

  // Delete all candidates
  app.delete("/candidates", candidates.deleteAll);
};
