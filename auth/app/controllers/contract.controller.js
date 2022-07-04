const Contract = require("../models/contract.model.js");

// Create and Save a new Contract
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  contracts = []
  for (i = 0; i < req.body.length; i++) {
    // Create a Contract
    const candidate = new Contract({
      //name: req.body.name,
      address: req.body[i].address,
      department: req.body[i].department
    });
    contracts.push(candidate)
  }
  // Save  in the database
  Contract.create(contracts, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contract."
      });
    else res.send(data);
  });
};

// Retrieve all Contracts from the database.
exports.findAll = (req, res) => {
  Contract.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving candidates."
      });
    else res.send(data);
  });
};

// Find a single Contract with a customerId
exports.findOne = (req, res) => {
  Contract.findById(req.body.department, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contract with id ${req.params.department}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contract with id " + req.params.department
        });
      }
    } else res.send(data);
  });
};
// Delete all Contracts from the database.
exports.deleteAll = (req, res) => {
  Contract.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all candidates."
      });
    else res.send({ message: `All Contracts were deleted successfully!` });
  });
};
