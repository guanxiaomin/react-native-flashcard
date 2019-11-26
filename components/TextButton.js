import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { white, blue } from '../utils/colors'

export default TextButton = ({ children, onPress, style ={} }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: blue,
    width: 150,
    elevation: 3
  },
  buttonText: {
    color: white,
    textAlign: 'center'
  }
})

