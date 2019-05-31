const path = require("path");
const db = require("../models");

module.exports = function(app) {

    app.post("/api/temp", (req, res)=> {

        console.log(req.body.temp)
        db.led.findOne({ where: 
            {
            id: 1
            }
          })
          .then(led => {
            led.update({
              temp: req.body.temp
            });
          });
    })

    app.post("/api/door", (req, res)=> {
        console.log(req.body.door)
        db.led.findOne({ where: 
            {
            id: 1
            }
          })
          .then(led => {
            led.update({
              door: req.body.door
            });
        });
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

    app.post("/api/led/:id", (req, res) => {

        let state;

        if(req.body.state === "On"){
            state = 0;
        }
        else{
            state = 1;
        }

        db.led.findOne({ where: 
            {
            id: req.params.id
            }
          })
          .then(led => {
            led.update({
              position: state
            });
          });
      });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

};