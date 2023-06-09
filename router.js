import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import PostsScreen from './screens/mainScreens/PostsScreen';
import Profile from './screens/mainScreens/Profile';
import CreateScreen from './screens/mainScreens/CreateScreen';

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName='Login'
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <AuthStack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name='Register'
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize;

          if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
            iconSize = focused && size ? 35 : 24;
          } else if (route.name === 'Posts') {
            iconName = focused ? 'ios-list-circle' : 'ios-list';
            iconSize = focused && size ? 35 : 24;
          } else if (route.name === 'CreateScreen') {
            iconName = focused ? 'ios-create' : 'ios-create-outline';
            iconSize = focused && size ? 35 : 24;
          }
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
    >
      <MainTabs.Screen name='Posts' component={PostsScreen} />
      <MainTabs.Screen name='Profile' component={Profile} />
      <MainTabs.Screen name='CreateScreen' component={CreateScreen} />
    </MainTabs.Navigator>
  );
};

export default useRoute;
