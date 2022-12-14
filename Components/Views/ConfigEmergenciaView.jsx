import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/base/dist/Button';
import { Input } from '@rneui/themed';
import BackgroundImage from '../BackgroundImage';
const ConfigEmergenciaView = () => {
    const [inputValueNEmergencia, setInputValueNEmergencia] = useState('+54 9') 
    const [numeroTelefonoActual, setNumeroTelefonoActual] = useState('')
    const setNumeroTelefono = (value) => {
        setNTelefono(value)
    }

    useEffect(() => {   
        getNTelefono()
    }, [])

    function validarNumeroTelefono(num){
        const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        return re.test(num)
    }

    const setNTelefono = async (value) => {

        try {
          await AsyncStorage.setItem('numero_emergencia', value)
          console.log(value)
        } catch (e) {
            console.log(e);
        }
    }

    const getNTelefono = async () => {
        try {
          await AsyncStorage.getItem('numero_emergencia').then((value) => setNumeroTelefonoActual(value))
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <BackgroundImage/>
            <View style={styles.container}>
                <Text>{inputValueNEmergencia}</Text>
                <Input 
                    value={inputValueNEmergencia}
                    onChangeText={setInputValueNEmergencia}
                />
                <Button title='Cambiar Numero' onPress={() => setNumeroTelefono(inputValueNEmergencia)}/>
                <Text style={styles.telefonoActual}>Telefono Actual: {numeroTelefonoActual}</Text>
            </View>
        </>
    )
}

export default ConfigEmergenciaView

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    telefonoActual: {
        alignSelf: 'center'
    }
})