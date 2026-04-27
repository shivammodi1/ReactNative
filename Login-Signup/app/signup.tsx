import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MyButton from '@/components/MyButton'
import { useRouter } from 'expo-router'

const Signup = () => {
    const router = useRouter();
    const onLoginPress = () => {
        router.navigate('/login');
        console.log("Login Pressed")
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

  return (
     <View style={styles.container}>

      <Image 
        source={require('../assets/images/signup.png')} 
        style={styles.image}
      />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />
      

      <TouchableOpacity style={styles.loginBtn} onPress={() => alert(`Username: ${username}\nPassword: ${password}`)}>
        <Text style={styles.loginText}>SignUp</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <MyButton title="Already have an account? Login" onPress={onLoginPress} />

    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f8f9fa'
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  loginBtn: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  or: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#888'
  }
})