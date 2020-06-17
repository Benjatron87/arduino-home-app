#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid     = "Hey Nate"; // wifi name
const char* password = "benjswifi"; // wifi password

const int sensorPin = 5; // pin D1
int wifiStatus;
int currentValue;
int previousValue = 0;

void setup() {
  pinMode(sensorPin, INPUT);

  WiFi.begin(ssid, password);

  Serial.begin(115200);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
}

void loop() {
  
  wifiStatus = WiFi.status();

  if(wifiStatus == WL_CONNECTED){
    
      Serial.println(digitalRead(sensorPin)); 
      currentValue = digitalRead(sensorPin);
      if(currentValue == 0 && previousValue == 1){
        postData("Open");
      }
      else if(currentValue == 1 && previousValue == 0){
        postData("Closed");
      }
      else{
        Serial.println("Nada");
      }

      previousValue = currentValue;
  }
  else {
    Serial.println("");
    Serial.println("WiFi not connected");
  }

  delay(250);
}


void postData(String doorStatus){
    String postdata = "doorStatus=" + doorStatus;
          
    HTTPClient http;    //Declare object of class HTTPClient

    http.begin("http://my-bedroom-controller.herokuapp.com/api/data");      //Specify request destination
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

    int httpPost = http.POST(postdata);
   
    http.end();   
}
