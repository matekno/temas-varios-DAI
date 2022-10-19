import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Contacto = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  )
}

export default Contacto

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        backgroundColor: '#e6e6e6',
        padding: 10
    }
})