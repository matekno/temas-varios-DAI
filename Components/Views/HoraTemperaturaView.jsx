import { ActivityIndicator, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackgroundImage from '../BackgroundImage'
import axios from 'axios';
import * as Location from 'expo-location';
const HoraTemperaturaView = () => {
    const API_KEY_WEATHER = '1ac50811824acbe70fea264481f99944'
    
    const baseUrlWeather = 'http://api.openweathermap.org/data/2.5/weather'

    const [locationData, setLocationData] = useState(null);

    const getWeatherWithLocation = (coords) => {
        axios.get(`${baseUrlWeather}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY_WEATHER}&units=metric`)
        .then((response) => {
            setLocationData(response.data)
            console.log(response.data);
        });
    }
    
    const getTime = () => {
        return new Date().toLocaleTimeString()
    }
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        await Location.getCurrentPositionAsync()
        .then(res => {
            getWeatherWithLocation(res.coords)
            getTimeWithCoords(res.coords)
        })
      })();
    }, []);

    return !locationData ? (
            <>
                <BackgroundImage />
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <ActivityIndicator color={'#288ff7'} size={50}/>
                </View>
            </>
        ) : (
            <>
                <BackgroundImage />
                <View style={styles.container}>
                    <View style={styles.tiempo}>
                        <Text style={{fontSize: 30}}>{getTime()}</Text>
                    </View>
                    <View style={styles.clima}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                            <Text>
                                <Text style={{fontSize: 20}}>{locationData.name}</Text>,
                                <Text style={{fontSize: 14}}>  {locationData.sys.country}</Text>
                            </Text>
                            <Text style={{fontSize: 18}}>{Math.round(locationData.main.temp, -1)}°C</Text>
                        </View>
                        <Text>Min {locationData.main.temp_min}°C</Text>
                        <Text>Max {locationData.main.temp_max}°C</Text>
                        <Text>Clima: {locationData.weather[0].description}</Text>
                        <Text>Humedad: {locationData.main.humidity}%</Text>
                        <Text>Viento: a {locationData.main.humidity} Km/h</Text>
                    </View>
                </View>
            </>
    )
}

export default HoraTemperaturaView

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    tiempo: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 15,
        width: windowWidth*.7,
        margin: 30,
        alignItems: 'center'
    },
    clima: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        width: windowWidth*.7
    }
})