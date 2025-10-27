import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../../utils/Dimension/Dimension';
import MainLayout from '../../Layout/MainLayout';
import Font from '../../assests/fonts/Font';
import Field from '../../components/Field/Field';
import colors from '../../assests/Colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../../components/Button/Button';
import ResToast from '../../components/ResToast/ResToast';
import { useDispatch } from 'react-redux';
import { authUser } from '../../redux/Features/authState';
import { user } from '../../redux/Features/authResponse';

const Login = () => {
  const [userData, setUserData] = useState({
    username: 'Hassan',
    phone: '0312-2354895',
    email: '',
    password: '',
  });
  const { username, phone, email, password } = userData;

  const dispatch = useDispatch();

  const handleData = ({ name, value }: { name: string; value: string }) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = () => {
    try {
      const isEmpty = Object.values(userData).some(value => value === '');
      if (isEmpty) {
        ResToast({ title: 'Please fill all fields.', type: 'warning' });
        return;
      }

      if (userData.password != 'password123') {
        ResToast({ title: 'Invalid password.', type: 'danger' });
        return;
      }

      if (userData.email != 'hassan@gmail.com') {
        ResToast({ title: 'Invalid Email.', type: 'danger' });
        return;
      }

      const res = dispatch(authUser({ data: userData }));
      console.log(res);

      if (res.payload.data != null) {
        ResToast({ title: 'User Logged In Successfully', type: 'success' });
        return;
      }
    } catch (error) {
      ResToast({ title: 'Something went wrong.', type: 'danger' });
    }
  };

  return (
    <MainLayout>
      <View
        style={{
          height: windowHeight,
          justifyContent: 'flex-start',
          marginTop: windowHeight * 0.15,
        }}
      >
        <View style={{ gap: 40 }}>
          <View style={{ gap: 40 }}>
            <View>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.title}>Back!</Text>
            </View>
            <View style={{ gap: 20, alignItems: 'flex-start' }}>
              <Field
                type="email"
                isIcon={<Ionicons name="person" color={colors.gray} />}
                placeHolder="Username or Email"
                value={email}
                onChange={value => handleData({ name: 'email', value })}
                inputWidth={windowWidth - 60}
                placeHolderTextColor={colors.gray}
                divWidth={windowWidth - 20}
              />
              <View>
                <Field
                  type="password"
                  CustomIcon={<Entypo name="lock" size={20} color="gray" />}
                  placeHolder="Password"
                  value={password}
                  onChange={value => handleData({ name: 'password', value })}
                  inputWidth={windowWidth - 80}
                  divWidth={windowWidth - 20}
                  placeHolderTextColor={colors.gray}
                  iconColor="gray"
                />
                <Text
                  style={{
                    color: colors.SecondaryColor,
                    fontSize: 14,
                    textAlign: 'right',
                    marginTop: 5,
                    fontFamily: Font.font400,
                  }}
                >
                  Forgot Password?
                </Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 30 }}>
            <Button
              name="Login"
              customWidth={windowWidth - 20}
              onPress={handleLogin}
            />
            <Text
              style={{
                color: colors.textColor,
                textAlign: 'center',
              }}
            >
              - OR Continue with -
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity style={styles.iconContainer}>
                <Image
                  source={require('../../assests/Images/Icon/GoogleIcon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Image
                  source={require('../../assests/Images/Icon/AppleIcon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Image
                  source={require('../../assests/Images/Icon/fIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontFamily: Font.font500,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: colors.SecondaryColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
