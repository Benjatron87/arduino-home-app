let pos1, pos2, pos3;
let bool1 = true, bool2 = true, bool3 = true;

getTemp = function(){
    $.get("api/temp", function(req, res){

        let temp = req[req.length - 1].Temp;

        if(temp === "Null"){
            $("#temp").html(temp);
        }
        else{
            temp = parseInt(temp)

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
        }
        
    });
}

getTemp();
setInterval(getTemp, 1000);

getClr = function(pos, num){

    if(pos === 1){

        $("#mybtn" + num).css('background', 'green');
        $("#mybtn" + num).text("On");
    }
    else if(pos === 0){

        $("#mybtn" + num).css('background', 'red');
        $("#mybtn" + num).text("Off");
    }
}

getLed = function(){
    $.get("/api/led/", function(req, res){
        
        pos1 = req[0].position
        pos2 = req[1].position
        pos3 = req[2].position

        getClr(pos1, 1);
        getClr(pos2, 2);
        getClr(pos3, 3);
    })
}

updateLed = function(id, led) {
    $.ajax("/api/led/" + id, {
        method: "PUT",
        data: led
    }).then(function(){

    });
}

update = function(pos, num){
    let update = {};

    if(pos === 1){
        getLed();
        update.position = 0;
        updateLed(num, update);
    }
    else if(pos === 0){
        getLed();
        update.position = 1;
        updateLed(num, update);
    }
}

$(".mybtn").unbind().on('click', function(){

    getLed();
    num = $(this).val();
    

    if(num == 1){
        if(bool1 === true){
            $("#mybtn" + num).css('background', 'green');
            $("#mybtn" + num).text("On");

            bool1 = false;
        }
        else{
            $("#mybtn" + num).css('background', 'red');
            $("#mybtn" + num).text("Off");

            bool1 = true;
        }
        update(pos1, num);
    }
    else if(num == 2){
        if(bool2 === true){
            $("#mybtn" + num).css('background', 'green');
            $("#mybtn" + num).text("On");

            bool2 = false;
        }
        else{
            $("#mybtn" + num).css('background', 'red');
            $("#mybtn" + num).text("Off");

            bool2 = true;
        }
        update(pos2, num);
    }
    else if(num == 3){
        if(bool3 === true){
            $("#mybtn" + num).css('background', 'green');
            $("#mybtn" + num).text("On");

            bool3 = false;
        }
        else{
            $("#mybtn" + num).css('background', 'red');
            $("#mybtn" + num).text("Off");

            bool3 = true;
        }
        update(pos3, num);
    } 
})

setInterval(getLed, 1000);
