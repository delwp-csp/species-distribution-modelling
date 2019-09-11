const express = require("express");

// initializing application
const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send('Hello World');
});

app.get("/users", (req, res) => {
  
});

app.listen(5000, () => {
  console.log('server running');
});