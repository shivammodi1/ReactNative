import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function ScrollViewScreen() {
  return (
    // ScrollView makes the content scrollable when it
    // exceeds the screen height. It is useful when you have a lot of content to display.
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      
      <Text style={styles.heading}>ScrollView Example</Text>

      <TextInput style={styles.input} placeholder="Enter Name" />
      <TextInput style={styles.input} placeholder="Enter Email" />
      <TextInput style={styles.input} placeholder="Enter Phone" />
      <TextInput style={styles.input} placeholder="Enter Address" />

      {/* Add lots of content */}
      {
        Array.from({ length: 20 }, (_, i) => (
          <View key={i} style={styles.box}>
            <Text>Item {i + 1}</Text>
          </View>
        ))
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  box: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
})