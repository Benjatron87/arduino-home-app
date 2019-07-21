const db = require("../models");

module.exports = function(app) {

    app.post("/api/data", (req, res)=> {

        console.log(req.body)
        db.led.findOne({ where: 
            {
            id: 1
            }
          })
          .then(led => {
            led.update({
              temp: req.body.Temp,
              door: req.body.doorStatus
            });
          });
    })

    app.post("/api/solar", (req, res)=> {

      console.log(req.body)
      db.led.findOne({ where: 
          {
          id: 4
          }
        })
        .then(led => {
          led.update({
            solarTemp: req.body.solarTemp
          });
        });
  })

    app.get("/api/led/", (req, res) => {
      
        db.led.findAll({})  
          .then((dbled) => {
            
            res.json(dbled);
          });
      });

    app.get("api/led/:id", (req, res) => {
    
      db.led.findOne({ where: 
        {
          id: req.params.id
        }
      })
      .then( (result) => {
      
        res.json(result)
      })

    })

    app.post("/api/led/all/", (req, res) => {

      let opposite;

      if(req.body.state === 'On'){
        opposite = "Off";
      }
      else{
        opposite = "On";
      }

      db.led.update({
        position: req.body.state
      }, {
        where: {
          position: opposite
        }
      }).then((dbLed) => {
        res.json(dbLed);
      });
    });

    app.post("/api/led/:id", (req, res) => {
        
        db.led.findOne({ where: 
            {
            id: req.params.id
            }
          })
          .then(led => {
            led.update({
              position: req.body.state
            });
          });
      });

};