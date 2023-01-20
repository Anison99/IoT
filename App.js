import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated, StyleSheet, Button } from 'react-native'

import Device from './scenes/Device.js';
import NewDevice from './scenes/NewDevice';
import Connection from './scenes/Connection';


const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Device" component={Device}/>
        <Tab.Screen name="Connection" component={Connection}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
