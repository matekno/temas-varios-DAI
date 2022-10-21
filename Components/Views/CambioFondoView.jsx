import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType, takePictureA } from 'expo-camera';

const CambioFondoView = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camaraOpen, setCamaraOpen] = useState(false)
  const [camera, setCamera] = useState(null)

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const abrirCamara = () => {
    requestPermission() 
    setCamaraOpen(true)
  }

  const cerrarCamara = () => {
    setCamaraOpen(false)
  }
  const takePicture = async () => {
    if(camera){
      const dataPic = await camera.takePictureAsync(null)
      console.log(dataPic);
      setImage(dataPic.uri)
      try {
        await AsyncStorage.setItem('bg-image', dataPic.uri)
        setCamaraOpen(false)
      } catch (e) {
        console.log(e);
      }
    }
  }

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
        setCamaraOpen(false)
      } catch (e) {
        console.log(e);
      }
    }
  };

  return !camaraOpen ? (
    <View style={{justifyContent: 'center'}}>
      <Button title='Elegir Fondo' onPress={abrirCamara}/>
      <Image style={styles.image} source={{uri: image}} resizeMode="cover"/>
    </View>
  ) : (
      <Camera 
        ratio='16:9' 
        style={styles.camera} 
        type={type}
        ref={ref => setCamera(ref)}
        >
        <TouchableOpacity style={[styles.buttonCam, styles.buttonCloseCam]} onPress={cerrarCamara}>
          <Text style={styles.icon}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonCam, styles.buttonCaptura]} onPress={takePicture}>
          <Text style={styles.icon}>📸</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonCam, styles.buttonFiles]} onPress={pickImage}>
          <Text style={styles.icon}>🗃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonCam, styles.buttonToggleCam]} onPress={toggleCameraType}>
          <Text style={styles.icon}>↩</Text>
        </TouchableOpacity>
      </Camera>
  )
}

export default CambioFondoView

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  camera: {
    width: windowWidth,
    height: windowHeight,
  },
  buttonCam: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  buttonFiles: {
    right: 30,
    top: 30
  },
  buttonCaptura: {
    left: windowWidth*.5 - 30,
    bottom: 80
  },
  buttonCloseCam: {
    top: 30,
    left: 30
  },
  buttonToggleCam: {
    bottom: 80,
    right: 30
  },

  icon: {
    fontSize: 28
  },
  image: {
    width: 280,
    height: 340,
  }
})