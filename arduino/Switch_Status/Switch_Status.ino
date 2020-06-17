#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid     = "Hey Nate"; // wifi name
const char* password = "benjswifi"; // wifi password

int powPin1 = 14; // pin D5
int powPin2 = 16; // pin D0
int powPin3 = 5; // pin D1

int wifiStatus;
     
 void setup() {
      
      Serial.begin(115200);
      // We start by connecting to a WiFi network
     
      Serial.println();
      Serial.println();
      Serial.print("Your are connecting to;");
      Serial.println(ssid);

      pinMode(powPin1, OUTPUT);
      pinMode(powPin2, OUTPUT);
      pinMode(powPin3, OUTPUT);
      
      WiFi.begin(ssid, password);
      
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
      }
     
}

void switchStatus(String a, int b){
  
  if(b == powPin3){
    if (a == "On"){
      Serial.print("on");
      digitalWrite(b, HIGH);
              }         
    else if (a == "Off"){
        Serial.print("off");
        digitalWrite(b, LOW);
    }
  }
  else{
    if (a == "On"){
        Serial.print("on");
        digitalWrite(b, LOW);
                }         
    else if (a == "Off"){
        Serial.print("off");
        digitalWrite(b, HIGH);
    }
  }
}
     
void loop() {

      wifiStatus = WiFi.status();

      if(wifiStatus == WL_CONNECTED){
        
         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP());  

          HTTPClient http;    //Declare object of class HTTPClient
 
          http.begin("http://my-bedroom-controller.herokuapp.com/api/led");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

          int httpGet = http.GET();
          String payload = http.getString();                  //Get the response payload
 
           Serial.println(httpGet);   //Print HTTP return code
           Serial.println(payload);    //Print request response payload

          const size_t capacity = JSON_ARRAY_SIZE(3) + 3*JSON_OBJECT_SIZE(6) + 250;
          DynamicJsonDocument doc(capacity);
          
          deserializeJson(doc, payload);
          
          JsonObject root_0 = doc[0];
          int root_0_id = root_0["id"]; 
          String root_0_position = root_0["position"];
          int root_0_temp = root_0["temp"];
          const char* root_0_door = root_0["door"];
          const char* root_0_updatedAt = root_0["updatedAt"];
          
          JsonObject root_1 = doc[1];
          int root_1_id = root_1["id"]; 
          String root_1_position = root_1["position"];
          const char* root_1_updatedAt = root_1["updatedAt"];
          
          JsonObject root_2 = doc[2];
          int root_2_id = root_2["id"]; 
          String root_2_position = root_2["position"];
          const char* root_2_updatedAt = root_2["updatedAt"];

          
          if (httpGet > 0) {

              String switch1 = root_0_position;
              String switch2 = root_1_position;
              String switch3 = root_2_position;
            
              Serial.print(switch1);
              Serial.print(switch2);
              Serial.print(switch3);
      
              switchStatus(switch1, powPin1);
              switchStatus(switch2, powPin2);
              switchStatus(switch3, powPin3);
          }
          
           http.end();  //Close connection
          }
 
      
      else{
        Serial.println("");
        Serial.println("WiFi not connected");
      }
}
