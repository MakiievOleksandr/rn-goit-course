import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReduser';

const { authLogOut, authStateChange, updateUserProfile } = authSlice.actions;

export const authSignUp =
  ({ email, password, nickName }) =>
  async (dispatch, _) => {
    try {
      console.log(nickName);
      await createUserWithEmailAndPassword(auth, email, password);

      // if (!response.user.displayName) {
      await updateProfile(auth.currentUser, { displayName: nickName });
      // }
      const { displayName, uid } = auth.currentUser;
      // const userUpdateProfile = {
      //   nickName: displayName,
      //   userId: uid,
      // };

      dispatch(
        updateUserProfile({
          nickName: displayName,
          userId: uid,
        })
      );
      // console.log(user.uid);
    } catch (error) {
      console.log('error:', error);
      console.log('error.message:', error.message);
    }
  };
export const authSignIn =
  ({ email, password }) =>
  async (dispatch, _) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user);
    } catch (error) {
      console.log('error:', error);
      console.log('error.message:', error.message);
    }
  };
export const authSignOut = () => async (dispatch, _) => {
  signOut(auth);

  dispatch(authLogOut());
};

export const authStateChangeUser = () => async (dispatch, _) => {
  await onAuthStateChanged(auth, (user) => {
    // console.log('USER FROM AUTHSTATECHANGE:', user);
    if (!user) {
      return;
    } else {
      // const { displayName, uid } = auth.currentUser;
      console.log('DISPLAYNAME:', user.displayName);
      // console.log('USER:', user);

      dispatch(
        updateUserProfile({
          nickName: user.displayName,
          userId: user.uid,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
