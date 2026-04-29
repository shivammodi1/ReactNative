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
        <Stack.Screen name='scrollView' options={{ title: 'ScrollView' }} />
        <Stack.Screen name='flatList' options={{ title: 'FlatList' }} />
        <Stack.Screen name='model' options={{title:'Model'}} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

