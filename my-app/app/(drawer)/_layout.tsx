import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'

const DrawerRoot = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <Drawer >
        <Drawer.Screen name="index" options={{ title: "Home" }} />
        <Drawer.Screen name="about" options={{ title: "About" }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default DrawerRoot

// GestureHandlerRoot view help to handle the gesture in drawer navigation. It is required to wrap the Drawer component with GestureHandlerRootView to enable the gesture handling for opening and closing the drawer.
// Drawer component is used to create a drawer navigation in the app. It allows you to define multiple screens that can be accessed by swiping from the left edge of the screen or by tapping on a menu icon. Each screen can have its own content and navigation options.