#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <OneWire.h> 
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 4 // pin D2

OneWire oneWire(ONE_WIRE_BUS); 

DallasTemperature sensors(&oneWire);

const char* ssid     = ""; // wifi name
const char* password = ""; // wifi password

const int trigPin = 14; // pin D5
const int echoPin = 16; // pin D0

long duration;
int distance;
int wifiStatus;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  sensors.begin(); 

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

        digitalWrite(trigPin, LOW);
        delayMicroseconds(2);
      
        digitalWrite(trigPin, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigPin, LOW);
        
        duration = pulseIn(echoPin, HIGH);
        distance = duration*0.034/2;
      
        Serial.print("Distance: ");
        Serial.println(distance);

        sensors.requestTemperatures();

         int Temp = (sensors.getTempFByIndex(0));
         String t = String(Temp); 

         String postdata;
         String doorStatus;
        
         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP()); 

          if(distance > 10){
            doorStatus = "Open";
          }
          else{
            doorStatus = "Closed";
          }

          postdata = "doorStatus=" + doorStatus + "&Temp=" + t;
          
          HTTPClient http;    //Declare object of class HTTPClient

          http.begin("http://my-bedroom-controller.herokuapp.com/api/data");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

          int httpPost = http.POST(postdata);
          Serial.println(postdata);
         
          http.end();   
         
    }
    
    else {
    Serial.println("");
    Serial.println("WiFi not connected");
    }
}
