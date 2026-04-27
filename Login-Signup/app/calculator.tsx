import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const Calculator = () => {
  const [num1, setNum1] = useState("")
  const [num2, setNum2] = useState("")
  const [result, setResult] = useState(0)

  useEffect(() => {
    const handleAdd = () => {
      // hume phale num1 ans num2 ko float me convert 
      // krke add krna hoga kyuki by default textinput se jo value aati hai wo string hoti hai
      const sum = parseFloat(num1) + parseFloat(num2)
      setResult(sum || 0)
    }
  }, [num1, num2]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>

      <TextInput
        placeholder="Enter num1"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Enter num2"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>

      <Text style={styles.result}>Result: {result}</Text>
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center'
  }
})