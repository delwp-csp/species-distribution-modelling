const express = require("express");

// initializing application
const app = express();


app.get("/", (req, res) => {
res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log("The request body", req.body);
  res.json(req.body);

  // const newPost = {
  //   nickname: req.body.nickname,
  //   userAnswer: req.body.userAnswer
  // };

  // new Post(newPost).save();


});

app.get("/users", (req, res) => {
  
});

app.post('/add-species', (req, res) => {
  console.log(req.body.message)
res.json(req.body)
})

const port = 5000;

app.listen(5000, () => {
  console.log('server running');
});