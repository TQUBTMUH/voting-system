const sql = require("./db.js");

// constructor
const User = function (user) {
  //this.email = Voter.email;
  this.department = user.department;
  this.registration_number = user.regNumber;
  this.password = user.hash;
  this.vote = user.vote;
  //this.active = Voter.active;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (hash, result) => {
  sql.query("SELECT * FROM users WHERE `password` = ?", hash, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Voter with the id
    result({ kind: "not_found" }, null);
  });
};


User.voteAuth = (hash, result) => {
  sql.query(
    "UPDATE users SET vote = ? WHERE `hash` = ?",
    [1, hash],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Voter with the id
        result({ kind: "not_found" }, null);
        return;
      }
      sql.query("SELECT * FROM users WHERE `hash` = ?", hash, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("found User: ", res[0]);
          result(null, { "message": "SUCCESS" });
          return;
        }

        // not found Voter with the id
        result({ kind: "not_found" }, null);
      });
      //console.log("updated Voter: ", { id: id, ...Voter });
      // result(null, );
    }
  );
};


User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
