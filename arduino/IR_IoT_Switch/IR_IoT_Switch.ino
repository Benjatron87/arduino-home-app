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

void sendSwitch(String state){

      String postdata = "state=" + state;

      HTTPClient http;
  
      http.begin("http://my-bedroom-controller.herokuapp.com/api/led/all/");      //Specify request destination
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

      int httpPost = http.POST(postdata);
      Serial.println(postdata);

      http.end();   
}

void loop() {
  
  wifiStatus = WiFi.status();

  if(wifiStatus == WL_CONNECTED){
         
         if (irrecv.decode(&results)) {
   
            const int val = results.value;

            Serial.println(val);

            if(val == 16712445){
              sendSwitch("On");
            }
            else{
              sendSwitch("Off");
            }
            Serial.println("");
            irrecv.resume();
         }
         
    }
    
    else{
      Serial.println("");
      Serial.println("WiFi not connected");
    }
}
