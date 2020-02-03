#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <OneWire.h> 
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 4 // pin D2

OneWire oneWire(ONE_WIRE_BUS); 

DallasTemperature sensors(&oneWire);

// WiFi credentials.
const char* WIFI_SSID = "TG1672GF2";
const char* WIFI_PASS = "TG1672G1F79F2";

int wifiStatus;

void connect() {

    // Connect to Wifi.
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);
  
    WiFi.begin(WIFI_SSID, WIFI_PASS);
  
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    wifiStatus = WiFi.status();

    if(wifiStatus == WL_CONNECTED){

         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP()); 

         sensors.requestTemperatures();

         int Temp = (sensors.getTempFByIndex(0));
         String t = String(Temp); 

         String postdata;

         postdata = "voltage=" + String(analogRead(A0)) + "&solarTemp=" + t;
          
         HTTPClient http;    //Declare object of class HTTPClient
  
         http.begin("http://my-bedroom-controller.herokuapp.com/api/solar");      //Specify request destination
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

void setup() {
  Serial.begin(115200);
  Serial.setTimeout(2000);

  // Wait for serial to initialize.
  while (!Serial) { }

  Serial.println("Device Started");
  Serial.println("-------------------------------------");
  Serial.println("Running Deep Sleep Firmware!");
  Serial.println("-------------------------------------");

  connect();

  Serial.println("Going into deep sleep for 20 minutes");
  ESP.deepSleep(30 * 60e6);
}

void loop() {
}
