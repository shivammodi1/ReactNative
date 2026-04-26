# Drawer and Gesture Handler
- In React native , we are using react native gesture handler to implement drawer navigation in our app.
- Like when we swipe from left to right , we can open the drawer and when we swipe from right to left , we can close the drawer.
- To implement drawer navigation in our app , we need to wrap our app with GestureHandlerRootView and then we can use Drawer component from expo-router/drawer to create a drawer navigation in our app.

# How to implement drawer navigation in our app
- Inside the app folder
     - Create a new folder with name '(drawer)'.
     - Inside the '(drawer)' folder , create a new file with name '_layout.tsx' and add the following code to it.
```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Drawer from 'expo-router/drawer'

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
```

- Inside the '(drawer)' folder , create a new file with name 'index.tsx' and add the following code to it.
```tsx
import { View, Text } from 'react-native'
import React from 'react'

const Home = ()=>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
};

export default Home
```

- Now It will create a drawer navigation when you click on the hamburger icon on the top left corner of the screen and you can navigate to the Home screen and About screen by clicking on the respective options in the drawer.
