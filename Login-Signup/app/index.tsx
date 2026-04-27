import { View, Text } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import MyButton from '@/components/MyButton'

export default function index() {

    // useRouter is a hook just like useNavigation in react
    // navigation library. It allows us to navigate between screens in our app.
    // 
    const router = useRouter();

    const onloginPress = () => {
        router.navigate('/login');
        console.log("Login Pressed");
    }

    const onSignupPress = () => {
        router.navigate('/signup');
        console.log("Signup Pressed")
    }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Welcome to Home Screen
      </Text>

        <MyButton title="Login" onPress={onloginPress} />
        <MyButton title="Signup" onPress={onSignupPress} />

    </View>
  )
}