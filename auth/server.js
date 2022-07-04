const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// var corsOptions = {
// origin: "http://localhost:5500"
// };
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to voting systems." });
});

require("./app/routes/candidate.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/contract.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
