import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { store } from './redux/store';

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
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}
