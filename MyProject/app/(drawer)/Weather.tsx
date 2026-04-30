import { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Animated,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
  Platform
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function Weather() {
  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [locationPermission, setLocationPermission] = useState(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const inputShake = useRef(new Animated.Value(0)).current;

  // 🌍 Function to get current location and fetch weather
  const getCurrentLocationWeather = async () => {
    try {
      setLoadingLocation(true);
      setError("");

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Allow location access to get weather at your current location.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Search Manually', onPress: () => setInput('') }
          ]
        );
        setError("Location permission denied");
        setLoadingLocation(false);
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      
      // Fetch weather using coordinates
      await fetchWeatherByCoords(latitude, longitude);
      
    } catch (err) {
      console.error('Location error:', err);
      Alert.alert(
        'Error',
        'Failed to get your location. Please check your GPS and try again.',
        [{ text: 'OK' }]
      );
      setError("Could not get your location");
    } finally {
      setLoadingLocation(false);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      const url = `${apiBaseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setWeatherData(null);
        return;
      }

      setWeatherData(data);
      
      // Update input with city name for display
      setInput(data.name);
      
      // Trigger animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Rotate animation for weather icon
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();

    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by city name (existing function)
  async function fetchWeatherData() {
    if (input.trim() === "") {
      shakeAnimation();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url = `${apiBaseUrl}?q=${input.trim()}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setWeatherData(null);
        shakeAnimation();
        return;
      }

      setWeatherData(data);
    } catch (err) {
      setError("Something went wrong");
      shakeAnimation();
    } finally {
      setLoading(false);
    }
  }

  // 🚀 Auto-load current location weather when app starts
  useEffect(() => {
    // Small delay to allow animations to play first
    const timer = setTimeout(() => {
      getCurrentLocationWeather();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(inputShake, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: 5, duration: 50, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: -5, duration: 50, useNativeDriver: true }),
      Animated.timing(inputShake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const getWeatherGradient = () => {
    if (!weatherData) return ['#0f172a', '#1e293b'];
    const temp = weatherData.main.temp;
    if (temp > 30) return ['#ff6b6b', '#ee5a24'];
    if (temp > 20) return ['#ffa502', '#ff7f50'];
    if (temp > 10) return ['#4ecdc4', '#44bdac'];
    if (temp > 0) return ['#45b7d1', '#3498db'];
    return ['#667eea', '#764ba2'];
  };

  const formatTemp = (temp) => {
    if (isCelsius) return `${Math.round(temp)}°C`;
    return `${Math.round((temp * 9/5) + 32)}°F`;
  };

  const getWeatherIcon = (weatherMain) => {
    const iconProps = { size: 120, color: "#fff" };
    
    switch(weatherMain?.toLowerCase()) {
      case 'clear':
        return <Feather name="sun" {...iconProps} />;
      case 'clouds':
        return <Feather name="cloud" {...iconProps} />;
      case 'rain':
        return <Feather name="cloud-rain" {...iconProps} />;
      case 'snow':
        return <Feather name="cloud-snow" {...iconProps} />;
      case 'thunderstorm':
        return <Feather name="cloud-lightning" {...iconProps} />;
      case 'drizzle':
        return <Feather name="cloud-drizzle" {...iconProps} />;
      case 'mist':
      case 'fog':
        return <Feather name="cloud-drizzle" {...iconProps} />;
      default:
        return <Feather name="cloud" {...iconProps} />;
    }
  };

  const onButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={getWeatherGradient()}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          flex: 1,
          padding: 20,
          paddingTop: 50,
        }}>
          {/* Header with animation */}
          <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}>
            <View style={{ alignItems: "center", marginBottom: 30 }}>
              <Ionicons name="partly-sunny" size={60} color="#fff" />
              <Text style={{
                fontSize: 42,
                fontWeight: "800",
                color: "#fff",
                textAlign: "center",
                marginTop: 10,
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5,
              }}>
                Weather App
              </Text>
              <Text style={{
                fontSize: 16,
                color: "#e0e0e0",
                textAlign: "center",
                marginTop: 5,
                opacity: 0.9
              }}>
                Your personal weather companion
              </Text>
            </View>
          </Animated.View>

          {/* Search Section */}
          <Animated.View style={{
            transform: [{ translateX: inputShake }]
          }}>
            <View style={{
              flexDirection: "row",
              gap: 12,
              marginBottom: 20,
            }}>
              <View style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 25,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.3)",
              }}>
                <Ionicons name="search-outline" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  placeholder="Search city..."
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={fetchWeatherData}
                  style={{
                    flex: 1,
                    color: "#fff",
                    padding: 15,
                    fontSize: 16,
                  }}
                />
              </View>
              
              {/* Location Button */}
              <Animated.View style={{
                transform: [{ scale: buttonScale }]
              }}>
                <TouchableOpacity
                  onPressIn={onButtonPressIn}
                  onPressOut={onButtonPressOut}
                  onPress={getCurrentLocationWeather}
                  disabled={loadingLocation}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  {loadingLocation ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Ionicons name="location" size={24} color="#fff" />
                  )}
                </TouchableOpacity>
              </Animated.View>

              {/* Search Button */}
              <Animated.View style={{
                transform: [{ scale: buttonScale }]
              }}>
                <TouchableOpacity
                  onPressIn={onButtonPressIn}
                  onPressOut={onButtonPressOut}
                  onPress={fetchWeatherData}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    width: 55,
                    height: 55,
                    borderRadius: 27.5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Loading State */}
          {(loading || loadingLocation) && (
            <Animated.View style={{
              alignItems: "center",
              marginTop: 40,
              opacity: fadeAnim
            }}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={{ color: "#fff", marginTop: 15, fontSize: 16 }}>
                {loadingLocation ? "Getting your location..." : "Fetching weather data..."}
              </Text>
            </Animated.View>
          )}

          {/* Error State */}
          {error !== "" && !loading && !loadingLocation && (
            <Animated.View style={{
              backgroundColor: "rgba(255,68,68,0.9)",
              padding: 15,
              borderRadius: 15,
              marginTop: 20,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              opacity: fadeAnim
            }}>
              <Ionicons name="alert-circle" size={24} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
                {error}
              </Text>
            </Animated.View>
          )}

          {/* Weather Display */}
          {weatherData?.main && (
            <Animated.View style={{
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
              marginTop: 20,
            }}>
              {/* Main Weather Card */}
              <View style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                borderRadius: 30,
                padding: 25,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.2)",
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowRadius: 15,
                elevation: 10,
              }}>
                {/* Location with current location indicator */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <Ionicons name="location-outline" size={24} color="#fff" />
                  <Text style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "#fff",
                    textShadowColor: 'rgba(0,0,0,0.2)',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 3,
                  }}>
                    {weatherData.name}
                  </Text>
                </View>
                <Text style={{
                  fontSize: 18,
                  color: "#e0e0e0",
                  marginBottom: 15,
                }}>
                  {weatherData.sys.country}
                </Text>

                {/* Animated Weather Icon */}
                <Animated.View style={{
                  transform: [{ rotate: rotateInterpolate }]
                }}>
                  {getWeatherIcon(weatherData.weather[0].main)}
                </Animated.View>

                {/* Temperature */}
                <TouchableOpacity 
                  onPress={() => setIsCelsius(!isCelsius)}
                  style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                >
                  <Text style={{
                    fontSize: 64,
                    color: "#fff",
                    fontWeight: "bold",
                    textShadowColor: 'rgba(0,0,0,0.2)',
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 5,
                  }}>
                    {formatTemp(weatherData.main.temp)}
                  </Text>
                  <Feather name="refresh-cw" size={20} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>

                <Text style={{
                  fontSize: 24,
                  color: "#f0f0f0",
                  marginTop: 5,
                  fontWeight: "500",
                }}>
                  {weatherData.weather[0].main}
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: "#e0e0e0",
                  marginTop: 5,
                  fontStyle: "italic",
                  textTransform: "capitalize",
                }}>
                  {weatherData.weather[0].description}
                </Text>

                {/* Temperature Range */}
                <View style={{
                  flexDirection: "row",
                  gap: 30,
                  marginTop: 20,
                  paddingTop: 20,
                  borderTopWidth: 1,
                  borderTopColor: "rgba(255,255,255,0.2)",
                }}>
                  <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
                    <Feather name="arrow-down" size={16} color="#fff" />
                    <Text style={{ color: "#e0e0e0", fontSize: 14 }}>Min</Text>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                      {formatTemp(weatherData.main.temp_min)}
                    </Text>
                  </View>
                  <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
                    <Feather name="arrow-up" size={16} color="#fff" />
                    <Text style={{ color: "#e0e0e0", fontSize: 14 }}>Max</Text>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                      {formatTemp(weatherData.main.temp_max)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Rest of your weather cards remain the same */}
              {/* Additional Info Cards */}
              <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 15,
                marginTop: 20,
                justifyContent: "space-between",
              }}>
                {[
                  { icon: <FontAwesome5 name="tint" size={28} color="#4ecdc4" />, label: "Humidity", value: `${weatherData.main.humidity}%` },
                  { icon: <Feather name="wind" size={28} color="#45b7d1" />, label: "Wind Speed", value: `${weatherData.wind.speed} m/s` },
                  { icon: <FontAwesome5 name="tachometer-alt" size={28} color="#96ceb4" />, label: "Pressure", value: `${weatherData.main.pressure} hPa` },
                  { icon: <Feather name="eye" size={28} color="#ffcc00" />, label: "Visibility", value: `${(weatherData.visibility / 1000).toFixed(1)} km` },
                ].map((item, index) => (
                  <Animated.View
                    key={index}
                    style={{
                      flex: 1,
                      minWidth: width * 0.27,
                      backgroundColor: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 20,
                      padding: 15,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.15)",
                      transform: [{
                        scale: scaleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9 + (index * 0.05), 1 + (index * 0.05)]
                        })
                      }]
                    }}
                  >
                    {item.icon}
                    <Text style={{ color: "#e0e0e0", fontSize: 12, marginTop: 8, marginBottom: 3 }}>
                      {item.label}
                    </Text>
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                      {item.value}
                    </Text>
                  </Animated.View>
                ))}
              </View>

              {/* Sun Times */}
              <View style={{
                flexDirection: "row",
                gap: 20,
                marginTop: 20,
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: 15,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.15)",
              }}>
                <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
                  <Feather name="sunrise" size={32} color="#ffcc00" />
                  <Text style={{ color: "#e0e0e0", fontSize: 12 }}>Sunrise</Text>
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                  </Text>
                </View>
                <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
                <View style={{ flex: 1, alignItems: "center", gap: 8 }}>
                  <Feather name="sunset" size={32} color="#ff7f50" />
                  <Text style={{ color: "#e0e0e0", fontSize: 12 }}>Sunset</Text>
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                  </Text>
                </View>
              </View>

              {/* Feels Like */}
              <View style={{
                marginTop: 20,
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: 15,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.15)",
              }}>
                <MaterialCommunityIcons name="thermometer" size={24} color="#fff" />
                <Text style={{ color: "#e0e0e0", fontSize: 14 }}>Feels like</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                  {formatTemp(weatherData.main.feels_like)}
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}