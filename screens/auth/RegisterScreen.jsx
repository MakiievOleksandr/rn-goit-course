import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { authSignUp } from '../../redux/auth/authOperations';
// import * as Font from 'expo-font';

// import AppLoading from 'expo-app-loading';

// import BCG from './assets/stars-on-night.jpg';

const initialState = {
  nickname: '',
  email: '',
  password: '',
};

export default function RegisterScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 20 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 20 * 2;
      setDimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener('change', onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUp(state));
    // console.log(state);
    setState(initialState);
  };

  const TWFHandler = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //як пофіксити поведінку клавіатури після натискння
  // кнопки підтвердження на самій клавіатурі ?
  // зникає нижній марджін

  return (
    <TouchableWithoutFeedback onPress={TWFHandler}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/stars-on-night.jpg')}
          style={styles.img}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.header,
                marginBottom: isShowKeyboard ? 30 : 120,
              }}
            >
              <Text style={styles.headerTitle}>Hello!</Text>
              <Text style={styles.headerTitle}>Sign up</Text>
              <Text style={styles.headerTitle}>to get started</Text>
            </View>
            <View
              style={{
                ...styles.form,

                //потрібно створити умови, щоб нижній марджін змінювався
                //разом із поворотом екрана, враховуючи видимість клавіатури,
                //щоб при повороті екрана було видно тайтл
                marginBottom: isShowKeyboard ? 20 : 100,
                width: dimensions < 480 ? dimensions : dimensions - 120,
              }}
            >
              <View>
                <Text style={styles.text}>Nickname</Text>
                <TextInput
                  value={state.nickname}
                  style={styles.input}
                  textAlign='center'
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      nickname: value,
                    }));
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                  value={state.email}
                  style={styles.input}
                  textAlign='center'
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, email: value }));
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Password</Text>
                <TextInput
                  value={state.password}
                  style={styles.input}
                  textAlign='center'
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  width: dimensions < 480 ? dimensions : 300,
                }}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  width: dimensions < 480 ? dimensions : 300,
                }}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={{ color: '#fff', marginTop: 20 }}>
                  Go to login
                </Text>
              </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    gap: 10,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'RobotoMono-Regular',
    color: '#ffffff',
    fontSize: 36,
  },
  form: {
    // marginHorizontal: 40,
  },
  textWrap: {
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'RobotoMono-Italic',
    color: '#fff',
    fontSize: 18,
    marginBottom: 4,
  },
  input: {
    paddingHorizontal: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    height: 40,
    color: '#fff',
    fontSize: 18,
  },
  btn: {
    height: 40,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: '#1e90ff',
      },
    }),
  },
  btnTitle: {
    fontFamily: 'RobotoMono-Regular',
    color: '#fff',
    fontSize: 18,
  },
});
