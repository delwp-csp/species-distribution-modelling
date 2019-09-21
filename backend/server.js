const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
// initializing application
const app = express();
const specieJsonPath = "./speciedata/species.json";

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

app.post("/", (req, res) => {
  console.log("The request body", req.body);
  console.log(typeof req.body);
  const jsonString = JSON.stringify(req.body);
  fs.writeFile("./species.json", jsonString, err => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
  res.json(req.body);
});

app.get("/users", (req, res) => {});

app.post("/add-species", (req, res) => {
  console.log(req.body.message);
  res.json(req.body);
});

const port = 5000;

app.listen(5000, () => {
  console.log("server running");
});
