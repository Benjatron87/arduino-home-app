const moment = require('moment');
const path = require("path");

const express = require('express');
const db = require("./models");

const app = express();

const PORT = process.env.PORT ||  8080;

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.get("/api/temp", (req, res)=> {
    res.json();
})

app.post("/api/temp", (req, res)=> {
    res.json();
})

app.get("/api/led/", (req, res) => {
   
    db.led.findAll({})
      .then((dbled) => {
        res.json(dbled);
      });
  });

app.get("api/led/:id", (req, res) =>
    db.led.findById(req.params.id).then( (result) => res.json(result))
);

  

app.put("/api/led/:id", (req, res) => {

    console.log(req.body);
    console.log(req.params.id);

    db.led.update(
        req.body,
    {
        where: {
            id: req.params.id
        }
    })
    .then((dbled) => {
       console.log("hey");
       res.json(dbled);
      });
  });

