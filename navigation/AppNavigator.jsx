import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';


// Telas
import Inicial from '../screens/Inicial';
import Detalhes from '../screens/Detalhes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer style={styles.navigation}>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicial} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: '#000',
        
    }
})
