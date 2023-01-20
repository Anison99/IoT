import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewDevice = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [command, setCommand] = useState('');
  const [color, setColor] = useState('');

  const handleSave = async () => {
    // Save data to AsyncStorage
    try {
      const devices = JSON.parse(await AsyncStorage.getItem('devices')) || [];
      devices.push({ name, room, command, color });
      await AsyncStorage.setItem('devices', JSON.stringify(devices));
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View>
        <Text>Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
        />
        <Text>Room:</Text>
        <TextInput
          value={room}
          onChangeText={setRoom}
        />
        <Text>Command:</Text>
        <TextInput
          value={command}
          onChangeText={setCommand}
        />
        <Text>Color:</Text>
        <TextInput
          value={color}
          onChangeText={setColor}
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};


export default NewDevice;



