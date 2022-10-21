import { StyleSheet, Text, TextInput, View, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../BackgroundImage'
const HomeView = ({}) => {
    const navigation = useNavigation()
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