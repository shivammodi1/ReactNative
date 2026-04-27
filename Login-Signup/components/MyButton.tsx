import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const MyButton = ({title , onPress}) => {

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

// using style sheet we can avoid inline styling 
// and also we can reuse the styles in other components as well.
// It also improves performance as styles are created only once and not on every render.
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'   // better UI
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default MyButton