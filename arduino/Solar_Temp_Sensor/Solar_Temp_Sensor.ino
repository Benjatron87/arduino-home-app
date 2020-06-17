#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT11 

DHT dht(DHTPIN, DHTTYPE);

// WiFi credentials.
const char* WIFI_SSID = "Hey Nate";
const char* WIFI_PASS = "benjswifi";
int count = 0;
int wifiStatus;

void connect() {

    // Connect to Wifi.
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);
  
    WiFi.begin(WIFI_SSID, WIFI_PASS);
  
    while (WiFi.status() != WL_CONNECTED && count <= 100) {
        delay(500);
        Serial.print(".");
        count = count + 1;
    }
    count = 0;

    wifiStatus = WiFi.status();

    if(wifiStatus == WL_CONNECTED){

         Serial.println("");
         Serial.println("Your ESP is connected!");  
         Serial.println("Your IP address is: ");
         Serial.println(WiFi.localIP()); 

         float h = dht.readHumidity();
         float t = dht.readTemperature();
         float tF = (t * 1.8) + 32;
         Serial.println("");
         Serial.print("Humidity: ");
         Serial.print(h); 

         Serial.println("");
         Serial.print("Temp: ");
         Serial.print(tF); 

         String postdata;

         postdata = "solarTemp=" + String(tF) + "&solarHumidity=" + String(h);
          
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
  Serial.println("DHTxx test!");
  dht.begin();
  Serial.setTimeout(2000);

  // Wait for serial to initialize.
  while (!Serial) { }

  Serial.println("Device Started");
  Serial.println("-------------------------------------");
  Serial.println("Running Deep Sleep Firmware!");
  Serial.println("-------------------------------------");

  connect();

  Serial.println("Going into deep sleep for 45 minutes");
  ESP.deepSleep(45 * 60e6);
}

void loop() {
}
