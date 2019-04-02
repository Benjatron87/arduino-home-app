#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <ArduinoJson.h>


    const char* ssid     = "";
    const char* password = "";  

    int ledPin = 13;

    int wifiStatus;
     
    void setup() {
      
      Serial.begin(115200);
      delay(1000);
     
      // We start by connecting to a WiFi network
     
      Serial.println();
      Serial.println();
      Serial.print("Your are connecting to;");
      Serial.println(ssid);

      pinMode(ledPin, OUTPUT);
      
      WiFi.begin(ssid, password);
      
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
      }
     
 }
     
void loop() {

       StaticJsonDocument<200> doc;

//      String temp, humidity, postData;
//      temp = String(t);
//      humidity = String(h);
//     
//      //Post Data
//      postData = "temp=" + temp;
      
      wifiStatus = WiFi.status();

      if(wifiStatus == WL_CONNECTED){
        
         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP());  

          HTTPClient http;    //Declare object of class HTTPClient
 
          http.begin("http://benj-thomsen-portfolio.herokuapp.com/api/emails");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

//        if (isnan(t)){
//          Serial.println("No Data to Push");
//        }
        
//        else{
//          int httpCode = http.POST(postData);      //Send the request
          int httpGet = http.GET();
          String payload = http.getString();                  //Get the response payload
 
           Serial.println(httpGet);   //Print HTTP return code
           Serial.println(payload);    //Print request response payload
//           Serial.println(postData);
          if (httpGet > 0) {
              // Parsing
              DeserializationError error = deserializeJson(doc, payload);

              if (error) {
                  Serial.print(F("deserializeJson() failed: "));
                  Serial.println(error.c_str());
                  return;
                }
            
              const char* position = doc["position"];
              Serial.print(position);

              if (position == 0){
                digitalWrite(ledPin, LOW);
              }
              else if (position == 1){
                digitalWrite(ledPin, HIGH);
              }
              else{
                Serial.print("Something went Wrong!");
              }
              
            }
          
           http.end();  //Close connection
//          }
 
      }
      else{
        Serial.println("");
        Serial.println("WiFi not connected");
      }
      delay(5000); // check for connection every once a second

}
