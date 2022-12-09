import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View, Alert, Button, Image, TextInput, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pokemon from './Pokemon';
import Info from './Info';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Pokemon} />
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}