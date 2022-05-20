let express = require('express');
let app = express();

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

module.exports = app;
