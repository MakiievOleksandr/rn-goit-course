import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.2262077,
          longitude: 30.1336786,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker
          coordinate={{
            latitude: 50.2262077,
            longitude: 30.1336786,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
