import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'

const HomeView = ({ navigation }) => {
    


    return (
        <View>
            <Button title='Configurar Nro de Emergencia' onPress={() => navigation.navigate('ConfigEmergencia')}/>
            
        </View>
    )
}

export default HomeView

const styles = StyleSheet.create({})