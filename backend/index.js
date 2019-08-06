const express = require("express");

// initializing application
const app = express();

app.get("/", (req, res) => {
  res.send('Hello World');
});

app.listen(8000, () => {
  console.log('server running');
})