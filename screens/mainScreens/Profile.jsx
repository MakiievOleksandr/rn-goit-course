import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignOut } from '../../redux/auth/authOperations';
import { state } from '../../redux/auth/authReduser';

const Profile = () => {
  const dispatch = useDispatch();
  console.log('LOG ON 9 ROW:', state.nickName);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 24 }}>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(authSignOut());
          console.log('LOG FROM TOUCHABALE OPACITY:', state.nickName);
        }}
        style={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'pink',
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'red', fontSize: 20, fontWeight: '600' }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
