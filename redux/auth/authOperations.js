import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReduser';

export const authSignUp =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: nickName });
      // console.log('CURRENTUSER:', auth.currentUser.displayName);

      const { displayName, uid } = auth.currentUser;

      const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      // console.log(user.uid);
    } catch (error) {
      console.log('error:', error);
      console.log('error.message:', error.message);
    }
  };
export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user);
    } catch (error) {
      console.log('error:', error);
      console.log('error.message:', error.message);
    }
  };
export const authSignOut = () => async (dispatch, getState) => {};

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    // console.log('USER FROM AUTHSTATECHANGE:', user);
    if (user) {
      const { displayName, uid } = auth.currentUser;
      // console.log('DISPLAYNAME:', displayName);

      // const userUpdateProfile = {};

      dispatch(
        authSlice.actions.updateUserProfile({
          nickName: displayName,
          userId: uid,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      console.log('authSTATECHANGE', authSlice.actions.authStateChange());
    }
  });
};
