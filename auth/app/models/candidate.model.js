const sql = require("./db.js");

// constructor
const Candidate = function (candidate) {
  //this.email = customer.email;
  this.name = candidate.name;
  //this.imga = customer.imga;
  //this.psymbol = customer.psymbol;
  this.position = candidate.position;
  this.department = candidate.department;
  //this.active = customer.active;
};

Candidate.create = (newCandidate, result) => {
  sql.query("INSERT INTO candidates SET ?", newCandidate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created candidate: ", { id: res.insertId, ...newCandidate });
    result(null, { id: res.insertId, ...newCandidate });
  });
};

Candidate.findById = (candidateId, result) => {
  sql.query(`SELECT * FROM candidates WHERE id = ${candidateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found candidate: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Candidate.getAll = result => {
  sql.query("SELECT * FROM candidates", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("candidates: ", res);
    result(null, res);
  });
};

Candidate.updateById = (id, candidate, result) => {
  sql.query(
    "UPDATE candidates SET name = ?, position = ?, department = ? WHERE id = ?",
    [candidate.name, candidate.position, candidate.department, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...candidate });
      result(null, { id: id, ...candidate });
    }
  );
};

Candidate.remove = (id, result) => {
  sql.query("DELETE FROM candidates WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted candidate with id: ", id);
    result(null, res);
  });
};

Candidate.removeAll = result => {
  sql.query("DELETE FROM candidates", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Candidate;
