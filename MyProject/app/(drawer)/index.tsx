import { View, Text, TouchableOpacity, Animated, Dimensions, StatusBar } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
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

    // Continuous rotation for weather icon
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const onButtonPressIn = (buttonType) => {
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
      colors={['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
        
        {/* Animated Weather Icon */}
        <Animated.View style={{
          transform: [{ rotate: rotateInterpolate }, { scale: scaleAnim }],
          marginBottom: 20,
        }}>
          <View style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 100,
            padding: 20,
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.3)",
          }}>
            <Ionicons name="cloud-sunny" size={80} color="#fff" />
          </View>
        </Animated.View>

        {/* App Title with Animation */}
        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 44,
            fontWeight: "800",
            color: "#fff",
            textAlign: "center",
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
          }}>
            Weather & News
          </Text>

          {/* Subtitle */}
          <Text style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            marginTop: 15,
            marginBottom: 30,
            paddingHorizontal: 20,
          }}>
            Get real-time weather updates and latest news from around the world
          </Text>

          {/* Feature Cards */}
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 15,
            marginBottom: 40,
            paddingHorizontal: 10,
          }}>
            {[
              { icon: <Ionicons name="location-outline" size={24} color="#fff" />, text: "Any City" },
              { icon: <Feather name="clock" size={24} color="#fff" />, text: "Real-time" },
              { icon: <FontAwesome5 name="temperature-high" size={24} color="#fff" />, text: "Accurate" },
              { icon: <Feather name="wind" size={24} color="#fff" />, text: "Details" },
              { icon: <MaterialCommunityIcons name="newspaper" size={24} color="#fff" />, text: "Latest News" },
            ].map((feature, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnim,
                  transform: [{ 
                    scale: scaleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8 + (index * 0.05), 1 + (index * 0.05)]
                    })
                  }],
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 25,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                {feature.icon}
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500" }}>
                  {feature.text}
                </Text>
              </Animated.View>
            ))}
          </View>

          {/* Buttons Container */}
          <View style={{ gap: 15, width: '100%', alignItems: 'center' }}>
            {/* Weather Button */}
            <Animated.View style={{
              transform: [{ scale: buttonScale }],
              width: '100%',
              alignItems: 'center',
            }}>
              <TouchableOpacity
                onPressIn={() => onButtonPressIn('weather')}
                onPressOut={onButtonPressOut}
                onPress={() => router.push("/(drawer)/Weather")}
                activeOpacity={0.9}
              >
                <Animated.View style={{
                  backgroundColor: "#fff",
                  paddingVertical: 16,
                  paddingHorizontal: 40,
                  borderRadius: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 8,
                  minWidth: 250,
                  justifyContent: 'center',
                }}>
                  <Ionicons name="cloud-sunny" size={24} color="#667eea" />
                  <Text style={{
                    color: "#667eea",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                    Check Weather
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>

            {/* News Button with Pulse Animation */}
            <Animated.View style={{
              transform: [{ scale: pulseAnim }],
              width: '100%',
              alignItems: 'center',
            }}>
              <TouchableOpacity
                onPressIn={() => onButtonPressIn('news')}
                onPressOut={onButtonPressOut}
                onPress={() => router.push("/(drawer)/News")}
                activeOpacity={0.9}
              >
                <Animated.View style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  paddingVertical: 16,
                  paddingHorizontal: 40,
                  borderRadius: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 2,
                  borderColor: "#fff",
                  minWidth: 250,
                  justifyContent: 'center',
                }}>
                  <MaterialCommunityIcons name="newspaper-variant" size={24} color="#fff" />
                  <Text style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                    Read News
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Footer Text */}
          <Animated.Text style={{
            opacity: fadeAnim,
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            marginTop: 50,
            textAlign: "center",
          }}>
            Free • No Ads • Real-time Weather • Global News
          </Animated.Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}