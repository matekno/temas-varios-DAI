import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CambioFondoView = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 17],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setImage(result.uri);
      try {
        await AsyncStorage.setItem('bg-image', result.uri)
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={{justifyContent: 'center', }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {
        image && 
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Image source={{ uri: image }} style={{ width: 180, height: 340 }} />
        </View>
      }
    </View>
  )
}

export default CambioFondoView

const styles = StyleSheet.create({})