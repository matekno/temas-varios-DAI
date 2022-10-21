import { StyleSheet, Text, TextInput, View, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../BackgroundImage'
import * as Linking from 'expo-linking';
import { Accelerometer } from 'expo-sensors';

const HomeView = ({}) => {
    const navigation = useNavigation()
    const [numeroEmergencia, setNumeroEmergencia] = useState('')

    const getNTelefono = async () => {
        try {
          await AsyncStorage.getItem('numero_emergencia').then((value) => setNumeroEmergencia(value))
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        getNTelefono()
    }, [])

    const handleWhatsAppPress = async() => {
        await Linking.openURL(`https://wa.me/${numeroEmergencia}?text=Mensaje Predefinido de Emergencia`)
    }

    //ACCELEROMETER
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      const [subscription, setSubscription] = useState(null);
    
      const _subscribe = () => {
        setSubscription(
          Accelerometer.addListener(accelerometerData => {
            setData(accelerometerData);
          })
        );
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };

      useEffect(() => {
        _subscribe();
        Accelerometer.setUpdateInterval(500);
      }, []);
    
      const { x, y, z } = data;
      
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

      useEffect(() => {
        if (x+y+z > 2) {
            handleWhatsAppPress()
            _unsubscribe()
            sleep(8000)
            .then(
                _subscribe()
            )
        }
      }, [data])
      

    return(
        <>
            <BackgroundImage/>
            <View style={styles.container}>
                <Button style={styles.button} title='Configurar Nro de Emergencia' onPress={() => navigation.navigate('ConfigEmergencia')}/>
                <Button style={styles.button} title='Hora - Temperatura' onPress={() => navigation.navigate('HoraTemperatura')}/>
                <Button style={styles.button} title='Contactos' onPress={() => navigation.navigate('Contactos')}/>
                <Button style={styles.button} title='Cambiar Fondo' onPress={() => navigation.navigate('CambioFondo')}/>
            </View>
        </>
    )
}

export default HomeView

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginVertical: 10,
    },
})