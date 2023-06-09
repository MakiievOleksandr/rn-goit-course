import { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DefaultScreen = ({ route, navigation }) => {
  const { params } = route;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (params && params.photo !== null) {
      setPosts((prevState) => [...prevState, params]);
    }
  }, [params]);
  // console.log(params);

  const getMap = () => {
    navigation.navigate('Map');
  };
  const getComments = () => {
    navigation.navigate('Comments');
  };
  const getFullImage = () => {
    navigation.navigate('FullImage', params.photo);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
        backgroundColor: 'red',
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={getFullImage}>
              <Image
                source={{ uri: item.photo }}
                style={{
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={getMap}
              style={{
                position: 'absolute',
                right: 20,
                bottom: 10,
              }}
            >
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 20,
                }}
              >
                <Ionicons name='ios-map-outline' size={24} color={'#fff'} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={getComments}
              style={{
                position: 'absolute',
                right: 50,
                bottom: 10,
              }}
            >
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 20,
                }}
              >
                <Ionicons
                  name='chatbubble-ellipses-outline'
                  size={24}
                  color={'#fff'}
                />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultScreen;
