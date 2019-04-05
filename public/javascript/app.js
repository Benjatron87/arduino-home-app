let bool1, bool2;
let update = {};

getTemp = function(){
    $.get("api/temp", function(req, res){

        let temp = parseInt(req[req.length - 1].Temp);

        if(temp >= 78){
            $("#temp").css("color", "red");
        }
        else if(temp > 68 && temp < 78){
            $("#temp").css("color", "green");
        }
        else if(temp <= 68){
            $("#temp").css("color", "rgb(0, 195, 202)");
        }

        $("#temp").html(temp + "&#8457");
    });
}

getTemp();
setInterval(getTemp, 1000);

$.get("/api/led/", function(req, res){
    
    let pos1 = req[0].position
    let pos2 = req[1].position

    update1 = {
        position: pos1
    }

    update2 = {
        position: pos2
    }

    if(pos1 === 1){
        bool1 = true

        $("#mybtn").css('background', 'green');
        $("#mybtn").text("On");
    }
    else if(pos1 === 0){

        bool1 = false

        $("#mybtn").css('background', 'red');
        $("#mybtn").text("Off");
        
    }

    if(pos2 === 1){
        bool2 = true

        $("#mybtn2").css('background', 'green');
        $("#mybtn2").text("On");
    }
    else if(pos2 === 0){

        bool2 = false

        $("#mybtn2").css('background', 'red');
        $("#mybtn2").text("Off");
    }


})


    function updateLed(id, led) {
    $.ajax("/api/led/" + id, {
      method: "PUT",
      data: led
    }).then(function(){

    });
  }


$("#mybtn").on('click', function(){

    if(bool1){

        bool1 = false

        $("#mybtn").css('background', 'red');
        $("#mybtn").text("Off");
        
        update.position = 0;

        updateLed(1, update);
    }
    else if(!bool1) {

        bool1 = true

        $("#mybtn").css('background', 'green');
        $("#mybtn").text("On");

        update.position = 1;

        updateLed(1, update);
    }
})
$("#mybtn2").on('click', function(){

if(bool2){

    bool2 = false

    $("#mybtn2").css('background', 'red');
    $("#mybtn2").text("Off");
    
    update.position = 0;

    updateLed(2, update);
}
else if(!bool2) {

    bool2 = true

    $("#mybtn2").css('background', 'green');
    $("#mybtn2").text("On");

    update.position = 1;

    updateLed(2, update);
}
})