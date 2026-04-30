import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="Weather" options={{ title: "Weather" }} />
      <Drawer.Screen name="News" options={{ title: "News" }} />
      {/* <Drawer.Screen name="Settings" options={{ title: "Settings" }} /> */}
    </Drawer>
  );
}