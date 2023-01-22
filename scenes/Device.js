import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Device = () => {
  const [devices, setDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [deviceName, setDeviceName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [command, setCommand] = useState("");
  const [color, setColor] = useState("");
  const [editingDevice, setEditingDevice] = useState(null);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const devices = await AsyncStorage.getItem('devices');
        setDevices(JSON.parse(devices));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', color: "#FFFFFF" }}>

        <View style={{marginBottom: 40, marginTop: 40}}>
            <Button  title="+ Dodaj urządzenie" onPress={() => setModalVisible(true)} style={{ width: 100, height: 200 }} color="#ff5c5c"/>
        </View>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
        >

        <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold',}}>Nazwa urządzenia</Text>
        <TextInput 
          placeholder="Wprowadź nazwę urządzenia" 
          onChangeText={(text) => setDeviceName(text)}
          value={deviceName}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold',}}>Nazwa pomieszczenia</Text>
        <TextInput 
          placeholder="Wprowadź nazwę pomieszczenia" 
          onChangeText={(text) => setRoomName(text)}
          value={roomName}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />

        <Text style={{ fontSize: 20, fontWeight: 'bold',}}>Komenda</Text>
        <TextInput 
          placeholder="Wprowadź komendę" 
          onChangeText={(text) => setCommand(text)}
          value={command}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />

      <Text style={{ fontSize: 20, fontWeight: 'bold',}}>Kolor</Text>
      <TextInput 
        placeholder="Wprowadź kolor"
        onChangeText={(text) => setColor(text)}
        value={color}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />

      <Button color='#17AA52' title={editingDevice ? "Zapisz zmiany" : "Dodaj urządzenie"} onPress={async () => {
        if (editingDevice) {
          const devices = await AsyncStorage.getItem('devices');
          let allDevices = JSON.parse(devices);
          allDevices = allDevices.map((el) => {
            if (el.id === editingDevice.id) {
              return {...el, name: deviceName, room: roomName, command, color};
            }
          return el;
        });

        await AsyncStorage.setItem('devices', JSON.stringify(allDevices));
        setDevices(allDevices);
        setEditingDevice(null);
        setModalVisible(false);
      } else {
        const newDevice = {
        id: Date.now(),
        name: deviceName,
        room: roomName,
        command,
        color
      };
      const devices = await AsyncStorage.getItem('devices');
      let allDevices = JSON.parse(devices) || []
      allDevices.push(newDevice);
      await AsyncStorage.setItem('devices', JSON.stringify(allDevices));
      setDevices(allDevices);
      setModalVisible(false);
      }
      }}
      />
      </View>
      </Modal>

      <FlatList
        data={devices}
        renderItem={({ item }) => (
        <View>
          <Text>Nazwa: {item.name}</Text>
          <Text>Pomieszczenie: {item.room}</Text>
          <Text>Komenda: {item.command}</Text>
          <Text>Kolor: {item.color}</Text>
          <Button
            title="Edytuj"
            onPress={() => {
              setEditingDevice(item);
              setModalVisible(true);
              setDeviceName(item.name);
              setRoomName(item.room);
              setCommand(item.command);
              setColor(item.color);
            }}
            color='#17AA52'
      
      />
      <Button
        color="#ff5c5c"
        title="Usuń"
        onPress={() => {
          Alert.alert(
            'Usuwanie urządzenia',
            `Czy na pewno chcesz usunąć urządzenie ${item.name}?`,
            [
              { text: 'Tak', onPress: async () => {
                const devices = await AsyncStorage.getItem('devices');
                let allDevices = JSON.parse(devices);
                allDevices = allDevices.filter((el) => el.id !== item.id);
                await AsyncStorage.setItem('devices', JSON.stringify(allDevices));
                setDevices(allDevices);
              }},
              { text: 'Nie', style: 'cancel' },
            ],
            { cancelable: false },
          );
        }}
      />
    </View>
  )}
  keyExtractor={(item) => item.id}
/>
    </View>
  );
};

export default Device;



