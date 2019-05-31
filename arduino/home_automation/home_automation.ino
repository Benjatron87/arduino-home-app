#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

    const char* ssid     = ""; // wifi name
    const char* password = ""; // wifi password

    int powPin1 = 14; // pin D5
    int powPin2 = 16; // pin D0
    int powPin3 = 5; // pin D1

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

      pinMode(powPin1, OUTPUT);
      pinMode(powPin2, OUTPUT);
      pinMode(powPin3, OUTPUT);
      
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
 
          http.begin("http://my-bedroom-controller.herokuapp.com/api/temp");      //Specify request destination
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
 
          http.begin("http://my-bedroom-controller.herokuapp.com/api/led");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

          int httpGet = http.GET();
          String payload = http.getString();                  //Get the response payload
 
           Serial.println(httpGet);   //Print HTTP return code
           Serial.println(payload);    //Print request response payload
          
          if (httpGet > 0) {
            
              Serial.print(payload[20]);
              Serial.print(payload[98]);
              Serial.print(payload[176]);
      
              if (payload[20] == '1'){
                Serial.print("off");
                digitalWrite(powPin1, LOW);
              }         
              if (payload[20] == '0'){
                Serial.print("on");
                digitalWrite(powPin1, HIGH);
              }
              if (payload[98] == '1'){
                Serial.print("off");
                digitalWrite(powPin2, LOW);
              }
              if (payload[98] == '0'){
                Serial.print("on");
                digitalWrite(powPin2, HIGH);
              }
              if (payload[176] == '0'){
                Serial.print("off");
                digitalWrite(powPin3, LOW);
              }
              if (payload[176] == '1'){
                Serial.print("on");
                digitalWrite(powPin3, HIGH);
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
