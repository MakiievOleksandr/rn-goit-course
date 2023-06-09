import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreen from '../nestedScreens/DefaultScreen';
import MapScreen from '../nestedScreens/MapScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import FullImageScreen from '../nestedScreens/FullImageScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator initialRouteName='Default'>
      <NestedScreen.Screen
        name='Default'
        component={DefaultScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen name='Map' component={MapScreen} />
      <NestedScreen.Screen name='Comments' component={CommentsScreen} />
      <NestedScreen.Screen name='FullImage' component={FullImageScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
