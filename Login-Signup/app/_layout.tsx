import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='login' options={{ title: 'Login' }} />
        <Stack.Screen name='signup' options={{ title: 'Signup' }} />
        <Stack.Screen name='calculator' options={{ title: 'Calculator' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

