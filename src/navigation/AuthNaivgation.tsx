import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screen/Auth/Login';

interface AuthProps {
  initRoute: string;
}

const AuthNaivgation = ({ initRoute }: AuthProps) => {
  const Stack = createNativeStackNavigator();
  const screenOptions = { headerShown: false };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initRoute}
        screenOptions={{ ...screenOptions }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNaivgation;

const styles = StyleSheet.create({});
