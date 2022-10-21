import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundImage = () => {
  const [BGImage, setBGImage] = useState('')

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('bg-image').then(result => setBGImage(result))
    })()
  }, [])

  return BGImage && (
    <Image style={styles.background} source={{uri: BGImage}} resizeMode="cover"/>
  )
}

export default BackgroundImage

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        width: windowWidth,
        height: windowHeight,
        position: 'absolute',
        opacity: .4
    }
})