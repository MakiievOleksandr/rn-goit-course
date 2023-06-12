import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

import { store, persistor } from './redux/store';

import Main from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoMono-Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono-Italic': require('./assets/fonts/RobotoMono-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
