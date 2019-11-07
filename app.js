let express = require("express");
let app = express();
let path = require("path");
var kmeans = require("kmeans-node");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

app.get("/cluster", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "cluster.html"));
});

var data = [];
var min = 0;
var max = 100;

for (var i = 0; i < 1000; i++) {
  var randomx = Math.random() * (+max - +min) + +min;
  var randomy = Math.random() * (+max - +min) + +min;
  data.push({ x: Math.floor(randomx), y: Math.floor(randomy) });
}

app.get("/getData", (req, res) => {
  res.send(data);
});

app.get("/calculate", (req, res) => {
  var id = req.query.id;
  var object = kmeans.object(data, id);
  res.send(object);
});

app.listen(3000, port => {
  console.log(`Server started at 3000`);
});
