import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

const CreateScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      // console.log(status);

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const photoSnap = await snap.takePictureAsync();
    setPhoto(photoSnap.uri);
    // console.log(location);
  };

  const sendPhoto = () => {
    navigation.navigate('Default', { photo });
    setPhoto(null);
  };

  if (hasPermission === null) {
    // console.log('hasPermission === null');
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={setSnap}>
          <View
            style={
              {
                // borderWidth: 1,
                // borderColor: '#fff',
              }
            }
          >
            {snap && (
              <Image
                source={{ uri: photo }}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: 50,
                  marginLeft: 20,
                  borderRadius: 10,
                }}
              />
            )}
          </View>
          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                Flip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              // onPress={async () => {
              //   if (snap) {
              //     const { uri } = await snap.takePictureAsync();
              //     await MediaLibrary.createAssetAsync(uri);
              //   }
              // }}
              onPress={takePhoto}
            >
              <View style={styles.takePhotoOut}>
                <View style={styles.takePhotoInner}></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <TouchableOpacity
        style={{ ...styles.button, marginTop: 20 }}
        onPress={sendPhoto}
      >
        <View style={styles.takePhotoOut}>
          <View style={styles.takePhotoInner}>
            <Text
              style={{
                color: 'green',
                fontFamily: 'RobotoMono-Regular',
                fontSize: 12,
              }}
            >
              SEND
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // camera: {
  //   height: 300,
  //   marginTop: 40,
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  // },
  // cameraBtn: {
  //   width: 60,
  //   height: 60,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 10,
  //   backgroundColor: 'pink',
  //   borderRadius: 50,
  // },
  // cameraBtnTitle: {
  //   color: '#fff',
  //   fontSize: 18,
  // },
  container: {
    flex: 1,
    backgroundColor: 'pink',
    paddingHorizontal: 10,
  },
  camera: {
    height: '60%',
    marginTop: 50,
    paddingBottom: 20,
    borderWidth: 5,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 20,
  },
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  flipContainer: {
    flex: 0.2,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
  button: { alignSelf: 'center' },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateScreen;
