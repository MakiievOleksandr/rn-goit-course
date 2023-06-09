import { NavigationContainer } from '@react-navigation/native';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRoute from '../router';
import { authStateChangeUser } from '../redux/auth/authOperations';

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  // const state = useSelector((state) => state);
  // console.log('STATE:', state);
  const dispatch = useDispatch();

  console.log('STATECHANGE', stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
