#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

    const char* ssid     = "Benj";
    const char* password = "benjamin";  

    int ledPin = 14; // pin D5
    int fanPin = 16; // pin D0

    double Thermistor(int RawADC) {
        double Temp;
         Temp = log(10000.0*((1024.0/RawADC-1)));
         Temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * Temp * Temp ))* Temp );
         Temp = Temp - 273.15;            // Convert Kelvin to Celcius
         Temp = (Temp * 1.8) + 32.0; // Convert Celcius to Fahrenheit
         return Temp;
     }

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
      pinMode(fanPin, OUTPUT);
      
      WiFi.begin(ssid, password);
      
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
      }
     
}

void sendTemp(){
  wifiStatus = WiFi.status();

      double Temp = int(Thermistor(analogRead(0)));
      String t = String(Temp);
      String postdata = "Temp=" + t;
      
      if(wifiStatus == WL_CONNECTED){
        
         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP());  

          HTTPClient http;    //Declare object of class HTTPClient
 
          http.begin("http://morning-atoll-96132.herokuapp.com/api/temp");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

          int httpPost = http.POST(postdata);
          Serial.print(postdata);

          http.end();
      }
      delay(1000);
}
     
void loop() {

      wifiStatus = WiFi.status();

      if(wifiStatus == WL_CONNECTED){

         sendTemp();
        
         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP());  

          HTTPClient http;    //Declare object of class HTTPClient
 
          http.begin("http://morning-atoll-96132.herokuapp.com/api/led");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

          int httpGet = http.GET();
          String payload = http.getString();                  //Get the response payload
 
           Serial.println(httpGet);   //Print HTTP return code
           Serial.println(payload);    //Print request response payload
          
          if (httpGet > 0) {
            
              Serial.print(payload[20]);
              Serial.print(payload[98]);
      
              if (payload[20] == '0'){
                Serial.print("off");
                digitalWrite(ledPin, LOW);
                Serial.print(payload[20]);
              }
              
              if (payload[20] == '1'){
                Serial.print("on");
                Serial.print(payload[20]);
                digitalWrite(ledPin, HIGH);
              }

              if (payload[98] == '0'){
                Serial.print("off");
                digitalWrite(fanPin, LOW);
                Serial.print(payload[98]);
              }
              
              if (payload[98] == '1'){
                Serial.print("on");
                Serial.print(payload[98]);
                digitalWrite(fanPin, HIGH);
              }
              
            }
          
           http.end();  //Close connection
          }
 
      
      else{
        Serial.println("");
        Serial.println("WiFi not connected");
      }
      delay(1000);

}
