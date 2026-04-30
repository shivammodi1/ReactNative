

----------------------------------------------------------------------------------------------
# App Starts → Request Permission → Get GPS Coordinates → Fetch Weather → Display Results    |
#     ↓              ↓                    ↓                   ↓              ↓               |
#  Component     User sees      Phone finds your      OpenWeather     Shows temp,            |
#   mounts      permission        exact location       API returns      humidity,            |
#                 popup          (lat, longitude)      weather data      etc.                |
----------------------------------------------------------------------------------------------

# Step 1: Import Location Library
- npx expo install expo-location

# Step 2: Request Permission (Critical First Step)
-  const { status } = await Location.requestForegroundPermissionsAsync();

## What happens here:
- iOS/Android shows a popup: "Weather App would like to access your location"
- User can choose "Allow" or "Deny"
- Returns status = 'granted' or 'denied'

# Step 3: Get GPS Coordinates
```js
const location = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.Balanced,
});
```
## What happens here:
- Phone uses GPS, Wi-Fi, and cell towers to find your location
- Returns an object with:
  - coords.latitude
  - coords.longitude
  - coords.accuracy (in meters)
- Example: { coords: { latitude: 37.7749, longitude: -122.4194, accuracy: 5 } }

# Step 4: Fetch Weather Using Coordinates
```js
const url = `${apiBaseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const response = await fetch(url);
const data = await response.json();
```
## What happens here:
- Your app sends a request to OpenWeather API with your lat/lon
- API processes the request and returns weather data for that location
- Example response includes:
    - main.temp (temperature in °C)
    - main.humidity (humidity %)
    - weather[0].description (e.g., "clear sky")
```js
{
  "name": "New York",        // City name derived from coordinates
  "sys": { "country": "US" },
  "main": {
    "temp": 22.5,            // Temperature in Celsius
    "humidity": 65,          // Humidity percentage
    "pressure": 1013,        // Atmospheric pressure
    "feels_like": 21.0
  },
  "weather": [{
    "main": "Clear",         // Weather condition
    "description": "clear sky"
  }],
  "wind": { "speed": 5.2 },  // Wind speed
  "visibility": 10000        // Visibility in meters
}
```

Step 1: Device GPS
┌─────────────────┐
│ Physical Signal │
│ from Satellites │
└────────┬────────┘
         ↓
Step 2: Expo Location
┌─────────────────┐
│ Location Object │
│ {lat, lon}      │
└────────┬────────┘
         ↓
Step 3: API Request
┌─────────────────┐
│ HTTP GET Request│
│ to OpenWeather  │
└────────┬────────┘
         ↓
Step 4: API Response
┌─────────────────┐
│ JSON Weather    │
│ Data            │
└────────┬────────┘
         ↓
Step 5: React State
┌─────────────────┐
│ setWeatherData()│
└────────┬────────┘
         ↓
Step 6: UI Update
┌─────────────────┐
│ Display Weather │
│ on Screen       │
└─────────────────┘