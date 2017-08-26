module.paths.push('/usr/local/lib/node_modules');

var express = require("express")
var parser = require("body-parser")
var path = require("path")
var cors = require("cors")
var moment = require("moment")

var app = express()

app.use(cors())
app.use(parser.json())
app.get("/", function(req, res) {
   var file = path.join(__dirname, 'index.html')
   res.sendFile(file, function(err) {
      if (err) return console.error(err)
      console.log("Sent: " + file)
   })
})

app.get("/:data", function(req, res) {
   var data = req.params.data
   var date
   if(/^\d{8,}$/.test(req.params.data)) {
      date = moment(data, "X")
   } else {
      date = moment(data, "MMMM D, YYYY")
   }

   if (date.isValid()) {
      res.json({
         unix: date.format("X"),
         natural: date.format("MMMM D, YYYY")
      })
   }
   else {
      res.json({
         unix: null,
         natural: null
      })
   }
})

app.listen(process.env.PORT), function() {
   console.log("It's working")
})
