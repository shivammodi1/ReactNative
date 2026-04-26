import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0f172a',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      
      <Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
      }}>
        Home 👋
      </Text>

      <Text style={{
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: 40
      }}>
        Tabs are visible below 👇
      </Text>

      <Link href="/details" asChild>
        <TouchableOpacity style={{
          backgroundColor: '#22c55e',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 10
        }}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            Go to Details
          </Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}