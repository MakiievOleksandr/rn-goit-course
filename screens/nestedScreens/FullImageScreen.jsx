import { View, Text, Image } from 'react-native';

const FullImageScreen = ({ route }) => {
  const { params } = route;
  return (
    <View style={{ flex: 1 }}>
      <Text>Full Image Screen</Text>
      <Image
        style={{ flex: 1, objectFit: 'contain' }}
        source={{ uri: params }}
      />
    </View>
  );
};

export default FullImageScreen;
