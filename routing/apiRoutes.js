const path = require("path");
const db = require("../models");
const temp = require("../data/temp");
const door = require("../data/door");

module.exports = function(app) {

    app.get("/api/temp", function(req, res) {
        res.json(temp);
    });

    app.post("/api/temp", (req, res)=> {
        temp.push(req.body);

        res.json(true);
    })

    app.get("/api/door", function(req, res) {
        res.json(door);
    });

    app.post("/api/door", (req, res)=> {
        door.push(req.body);

        res.json(true);
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

        db.led.update(
            req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then((dbled) => {
          res.json(dbled);
          });
      });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

};