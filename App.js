import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './Components/Views/HomeView';
import ConfigEmergenciaView from './Components/Views/ConfigEmergenciaView';
import ContactosView from './Components/Views/ContactosView';
import CambioFondoView from './Components/Views/CambioFondoView';
export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="ConfigEmergencia" component={ConfigEmergenciaView} />
        <Stack.Screen name="Contactos" component={ContactosView} />
        <Stack.Screen name="CambioFondo" component={CambioFondoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
