const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const PORT = 3001;
const path = "server/data.json";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/api/events", (req, res) => {
  if (fs.existsSync(path)) {
    var data = fs.readFileSync(path);
    var data = JSON.parse(data);
  } else {
    var data = [];
  }
  res.json({ message: "Sending json file content!", data: data, status: 200 })
});

app.post("/api/events/create", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  var data = []
  
  //Opening the file to get saved events
  if (fs.existsSync(path)) {
    data = fs.readFileSync(path);
    data = JSON.parse(data);
  }

  // Writing the data to the JSON file
  data.push(req.body);
  fs.writeFile(path, JSON.stringify(data), err => {
    if(err) throw err;
    console.log("New data added to the JSON file.", req.body);
    res.json({ message: "The query is added successfully!", status: 200 });
  });   
});


app.get("*", (req, res) => {
  res.json({ message: "Please check the api link and try again!", status: 404 });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});