let express = require('express');
let app = express();
let bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({"extended": false}))

console.log("Hello World")

app.use(function middleware(req, res, next) {
  console.log(req.method + " "  + req.path + " - " + req.ip)
  next()
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  let absolutPath = __dirname + "/views/index.html"
  res.sendFile(absolutPath)
})

// app.get("/", function(req, res) {
//   res.send("Hello Express")
// })

app.get("/json", function(req, res) {
  const mySecret = process.env['MESSAGE_STYLE']
  // console.log(".env", mySecret)
  mySecret === "uppercase" ? 
    res.json({"message": "HELLO JSON"}) : res.json({"message": "Hello json"}) 
})

app.get("/now", 
  function(req, res, next) {
    req.time = new Date().toString()
    next()
  }, 
  function(req, res) {
    res.json({"time": req.time})
  })

app.get("/:word/echo", function(req, res) {
  res.json({"echo": req.params.word})
})

app.route("/name")
  .get(function(req, res) {
    res.json({"name": req.query.first + " " + req.query.last})
  })
  .post(function(req, res) {
    res.json({ "name": req.body.first + " " + req.body.last})
  })

module.exports = app;
