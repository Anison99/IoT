import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function Connection() {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      }
    }, true);
    return () => subscription.remove();
  }, [manager]);

  const scanAndConnect = () => {
    setScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error)
        setScanning(false);
        return;
      }

      if (!devices.find((d) => d.id === device.id)) {
        setDevices([...devices, device]);
      }
    });
  };

  const stopScanning = () => {
    manager.stopDeviceScan();
    setScanning(false);
  };

  return (
    <View>
      <Text>Devices:</Text>
      {devices.map((device) => (
        <Text key={device.id}>{device.name} ({device.id})</Text>
      ))}
      {scanning ? (
        <Button title="Stop scanning" onPress={stopScanning} />
      ) : (
        <Button title="Scan for devices" onPress={scanAndConnect} />
      )}
    </View>
  );
}
