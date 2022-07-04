const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    // email: req.body.email,
    hash: req.body.hash,
    vote: 0,//req.body.vote,
    department: req.body.department,
    regNumber: req.body.regNumber
    //active: req.body.active
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User with a customerId
exports.findOne = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.findById(req.body.hash, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with hash ${req.body.hash}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.body.hash
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.voteauth = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.voteAuth(
    req.body.hash,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.hash}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.hash
          });
        }
      } else res.send(data);
    }
  );
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
