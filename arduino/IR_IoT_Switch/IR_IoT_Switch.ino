#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRrecv.h>
#include <IRutils.h>

const char* ssid     = ""; // wifi name
const char* password = ""; // wifi password

const int irPin = 5;    // pin D1

IRrecv irrecv(irPin);
decode_results results;

int wifiStatus;

void setup() {
  
  irrecv.enableIRIn();

  WiFi.begin(ssid, password);

  Serial.begin(115200);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
}

void sendAll(String state){

      String postdata = "state=" + state;

      HTTPClient http;
  
      http.begin("http://my-bedroom-controller.herokuapp.com/api/led/all/");      //Specify request destination
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

      int httpPost = http.POST(postdata);

      http.end();   
}

void sendSwitch(String id, String state){

      String postdata = "state=" + state;

      HTTPClient http;
  
      http.begin("http://my-bedroom-controller.herokuapp.com/api/led/" + id);      //Specify request destination
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

      int httpPost = http.POST(postdata);

      http.end();   
}

void loop() {
  
  wifiStatus = WiFi.status();

  if(wifiStatus == WL_CONNECTED){
         
         if (irrecv.decode(&results)) {
   
            const int val = results.value;

            switch (val) {
              case 16712445:
                   sendAll("On");
                break;
              case 16738455:
                   sendSwitch("1", "On");
                break;
              case 16750695:
                   sendSwitch("2", "On");
                break;
              case 16756815:
                   sendSwitch("3", "On");
                break;
              case 16724175:
                   sendSwitch("1", "Off");
                break;
              case 16718055:
                   sendSwitch("2", "Off");
                break;
              case 16743045:
                   sendSwitch("3", "Off");
                break;
              case 16728765:
                   sendAll("Off");
                break;
              default:
                   irrecv.resume();
                break;
            }

            irrecv.resume();
         }
         
    }
    
    else{
      Serial.println("");
      Serial.println("WiFi not connected");
    }
}
