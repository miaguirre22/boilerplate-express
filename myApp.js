let express = require('express');
let app = express();

console.log("Hello World")

app.use("/public", express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  let absolutPath = __dirname + "/views/index.html"
  res.sendFile(absolutPath)
})

app.get("/", function(req, res) {
  res.send("Hello Express")
})

module.exports = app;
