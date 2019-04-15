let pos1, pos2, pos3;

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

get = function(){
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
        get();
        update.position = 0;
        updateLed(num, update);
    }
    else if(pos === 0){
        get();
        update.position = 1;
        updateLed(num, update);
    }
}

$(".mybtn").unbind().on('click', function(){

    get();
    num = $(this).val();

    if(num == 1){
        update(pos1, num);
    }
    else if(num == 2){
        update(pos2, num);
    }
    else if(num == 3){
        update(pos3, num);
    } 
})

setInterval(get, 1000);
