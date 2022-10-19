import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const HomeView = ({}) => {
    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <Button style={styles.button} title='Configurar Nro de Emergencia' onPress={() => navigation.navigate('ConfigEmergencia')}/>
            <Button style={styles.button} title='Contactos' onPress={() => navigation.navigate('Contactos')}/>
            <Button style={styles.button} title='Cambiar Fondo' onPress={() => navigation.navigate('CambioFondo')}/>
        </View>
    )
}

export default HomeView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'space-around'
    },
    button: {
        marginVertical: 10,
    }
})