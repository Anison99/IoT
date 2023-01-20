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
        <Text style={{marginTop: 40}}>Name:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Text style={{marginTop: 20}}>Room:</Text>
        <TextInput
          value={room}
          onChangeText={setRoom}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Text style={{marginTop: 20}}>Command:</Text>
        <TextInput
          value={command}
          onChangeText={setCommand}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Text style={{marginTop: 20}}>Color:</Text>
        <TextInput
          value={color}
          onChangeText={setColor}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <View style={{ width: 100, height: 150, justifyContent: 'center', marginLeft: 145}}>
        <Button title="Save" onPress={handleSave}  color="#ff5c5c" />
        <Button title="Cancel" onPress={onClose}  color="#1CDB68" />
        </View>

        
      </View>
    </Modal>
  );
};


export default NewDevice;



