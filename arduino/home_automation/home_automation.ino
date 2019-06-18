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

      double Temp = int(Thermistor(analogRead(0)));
      
      String t = String(Temp);
      String postdata = "Temp=" + t;

      HTTPClient http;
  
      http.begin("http://MY-WEBSITE-NAME.herokuapp.com/api/temp");      //Specify request destination
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

      int httpPost = http.POST(postdata);
      Serial.print(postdata);
}

void switchStatus(char a, int b){
  
  if(b == powPin3){
    if (a == '1'){
      Serial.print("on");
      digitalWrite(b, HIGH);
              }         
    else if (a == '0'){
        Serial.print("off");
        digitalWrite(b, LOW);
    }
  }
  else{
    if (a == '1'){
        Serial.print("on");
        digitalWrite(b, LOW);
                }         
    else if (a == '0'){
        Serial.print("off");
        digitalWrite(b, HIGH);
    }
  }
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
 
          http.begin("http://MY-WEBSITE-NAME.herokuapp.com/api/led");      //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

          int httpGet = http.GET();
          String payload = http.getString();                  //Get the response payload
 
           Serial.println(httpGet);   //Print HTTP return code
           Serial.println(payload);    //Print request response payload
          
          if (httpGet > 0) {

              char switch1 = payload[20];
              char switch2 = payload[124];
              char switch3 = payload[226];
            
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
      delay(500);

}
