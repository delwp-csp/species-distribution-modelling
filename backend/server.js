const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
// initializing application
const app = express();
const specieJsonPath = "./species.json";

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// fs.writeFile(specieJsonPath,'[',err => {
//   if (err) {
//     console.log("Error writing file", err);
//   } else {
//     console.log("Successfully wrote file");
//   }
// });



writeSpecie = (path,jsonString)=>{
  fs.writeFile(path,jsonString, err => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}




app.post("/", (req, res) => {
  console.log("The request body", req.body);
  
  const jsonString = JSON.stringify(req.body,null,2);
  
  let data = fs.readFileSync(specieJsonPath,'utf-8');

  if (data.length == 0){
    writeSpecie(specieJsonPath,'['+jsonString+']')
  }else{
    data = data.substring(0, data.length-1);
    data = data + ',\n' + jsonString + ']'
    // console.log(data);
    // fs.appendFile('./species.json', data,  err => {
    //   if (err) throw err;
    //   console.log('Saved!');
    // });
    writeSpecie(specieJsonPath, data);

  }

  

  
//   fs.writeFile('./newCustomer.json', jsonString, err => {
//     if (err) {
//         console.log('Error writing file', err)
//     } else {
//         console.log('Successfully wrote file')
//     }
// })
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
