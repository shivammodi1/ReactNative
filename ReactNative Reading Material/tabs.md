# Tabs in React Native
- Tabs helps us to create a navigation structue in our app.
- We can use the `react-navigation` library to create tabs in our React Native app.
- It will create tabs at the bottom of the screen by default, but we can customize it as per our requirements.

# How to create Tabs in React Native?
1. First we need to create a folder inside app folder.
    - (tabs) naam ka folder create karo.
2. Uske andar 3 files create karo.
    - _layout.tsx -> Is file mein hum apne tabs ka layout banayenge.
    - home.tsx -> Is file mein hum home screen ka content banayenge.
    - profile.tsx -> Is file mein hum profile screen ka content banayenge.
3. Ab hum _layout.tsx file mein apne tabs ka layout banayenge.
```tsx
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" , tabBarIcon: () => <AntDesign name="home" size={24} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" , tabBarIcon: () => <AntDesign name="user" size={24} /> }} />
    </Tabs>
  );
};
```
4. Ab hum home.tsx file mein home screen ka content banayenge.
```tsx
import { View, Text } from "react-native";
const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};
```
5. Ab hum profile.tsx file mein profile screen ka content banayenge.
```tsx
import { View, Text } from "react-native";
const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};
```

6. Ab hum apne app ko run karenge to hume tabs dikhai denge jisme home aur profile screen ka content hoga.
