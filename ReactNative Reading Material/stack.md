# Stack in React Native
- Iska use inside the app/_layout.tsx file to define the stack navigator for your app.
- Stack ka use krke aap apne app ke different screens ko navigate kr sakte hain.
- Stack.Screen component ka use krke aap apne screens ko define kr sakte hain aur unke options set kr sakte hain, jaise ki headerShown, title, etc.
- Stack navigator automatically back button provide krta hai jab aap ek screen se dusri screen pe navigate krte hain.
- Stack navigator me aap apne screens ko kisi bhi order me define kr sakte hain, aur aap unhe kisi bhi screen se navigate kr sakte hain.
- Stack navigator me aap apne screens ke beech me transition animations bhi customize kr sakte hain.
- Stack navigator me aap apne screens ke beech me data bhi pass kr sakte hain using route params.

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: "Details" }} />
    </Stack>
  );
}
```
