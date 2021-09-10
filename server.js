//import bodyParser from "body-parser";
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const PORT = 8000;
//post route
app.post("/projectData", updateData);
function updateData(req, res) {
  (projectData["temperature"] = req.body.temperature),
    (projectData["date"] = req.body.date),
    (projectData["userResponse"] = req.body.userResp),
    res.send(projectData);
  console.log(projectData, "data sent");
}
//get route to send project data object
app.get("/all", (req, res) => {
  res.send(projectData);
});
//listening to the port 8000
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
