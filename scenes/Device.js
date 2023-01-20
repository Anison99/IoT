import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewDevice from './NewDevice';

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddDevice = async () => {
    try {
      setDevices(JSON.parse(await AsyncStorage.getItem('devices')));
    } catch (error) {
      console.log(error);
    }
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', color: "#FFFFFF" }}>
        <View style={{marginBottom: 40, marginTop: 40}}>
      <Button title="+ Add new device" onPress={handleAddDevice} style={{ width: 100, height: 200 }} color="#ff5c5c" />
      </View>
      <NewDevice visible={modalVisible} onClose={() => setModalVisible(false)} />
      {devices && devices.length > 0 && devices.map((device, index) => (
    <View key={index} style={{backgroundColor: device.color, width: '50%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name: {device.name}</Text>
      <Text>Room: {device.room}</Text>
      <Text>Command: {device.command}</Text>
      <Text>Color: {device.color}</Text>
    </View>
  ))}
    </View>
  );
};

export default Device;




