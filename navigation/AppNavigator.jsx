import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import Entrar from '../screens/Entrar'; // ✅ caminho corrigido

import Inicial from '../screens/Inicial';
import Detalhes from '../screens/Detalhes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            
            backgroundColor: '#1E40AF', // azul
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="ENTRAR" component={Entrar}  options={{ headerShown: false }}/>
        <Stack.Screen name="Inicio" component={Inicial} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
