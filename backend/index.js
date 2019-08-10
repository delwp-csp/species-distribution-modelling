const express = require("express");

// initializing application
const app = express();

app.get("/", (req, res) => {
  res.send('Hello World');
});

app.get("/users", (req, res) => {
  
});

app.listen(9000, () => {
  console.log('server running');
})