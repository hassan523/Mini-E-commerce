import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screen/User/Home/Home';
import Profile from '../screen/User/Profile/Profile';
import colors from '../assests/Colors/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Cart from '../screen/User/Cart/Cart';
import SingleProduct from '../screen/User/Home/SingleProduct';

const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

interface BtabsProps {
     initRoute: string;
}

function HomeTab() {
     return (
          <HomeStack.Navigator
               screenOptions={{
                    headerShown: false,
               }}
               initialRouteName="home"
          >
               <HomeStack.Screen name="home" component={Home} options={{ headerShown: false }} />
               <HomeStack.Screen name="singleProduct" component={SingleProduct} options={{ headerShown: false }} />
          </HomeStack.Navigator>
     );
}

function CartTab() {
     return (
          <CartStack.Navigator
               screenOptions={{
                    headerShown: false,
               }}
               initialRouteName="cart"
          >
               <CartStack.Screen name="cart" component={Cart} options={{ headerShown: false }} />
               <CartStack.Screen name="singleProduct" component={SingleProduct} options={{ headerShown: false }} />
          </CartStack.Navigator>
     );
}

function ProfileTab() {
     return (
          <ProfileStack.Navigator
               screenOptions={{
                    headerShown: false,
               }}
               initialRouteName="profile"
          >
               <ProfileStack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
          </ProfileStack.Navigator>
     );
}

const BtabNavigation = ({ initRoute }: BtabsProps) => {
     return (
          <NavigationContainer>
               <Tab.Navigator
                    initialRouteName={initRoute}
                    screenOptions={{
                         tabBarStyle: {
                              backgroundColor: colors.white,
                              height: 80,
                              paddingTop: 15,
                         },
                    }}
               >
                    <Tab.Screen
                         name="Home"
                         component={HomeTab}
                         options={{
                              headerShown: false,
                              tabBarIcon: ({ size, focused }) => (
                                   <View style={focused ? { width: 200, alignItems: 'center', gap: 3 } : { alignItems: 'center', width: 100, gap: 3 }}>
                                        <Octicons name="home" color={focused ? colors.SecondaryColor : colors.gray} size={26} />
                                        <Text
                                             style={{
                                                  color: focused ? colors.SecondaryColor : colors.gray,
                                                  fontSize: 12,
                                             }}
                                        >
                                             HOME
                                        </Text>
                                   </View>
                              ),
                              tabBarLabel: ({ focused }) => null,
                         }}
                    />
                    <Tab.Screen
                         name="Cart"
                         component={CartTab}
                         options={{
                              headerShown: false,
                              tabBarIcon: ({ size, focused }) => (
                                   <View style={focused ? { width: 200, alignItems: 'center', gap: 3 } : { alignItems: 'center', width: 100, gap: 3 }}>
                                        <Feather name="shopping-cart" color={focused ? colors.SecondaryColor : colors.gray} size={26} />
                                        <Text
                                             style={{
                                                  color: focused ? colors.SecondaryColor : colors.gray,
                                                  fontSize: 12,
                                             }}
                                        >
                                             CART
                                        </Text>
                                   </View>
                              ),
                              tabBarLabel: ({ focused }) => null,
                         }}
                    />
                    <Tab.Screen
                         name="Profile"
                         component={ProfileTab}
                         options={{
                              headerShown: false,
                              tabBarIcon: ({ size, focused }) => (
                                   <View style={focused ? { alignItems: 'center', width: 200, gap: 3 } : { alignItems: 'center', width: 100, gap: 3 }}>
                                        <FontAwesome5 name="user" color={focused ? colors.SecondaryColor : colors.gray} size={26} />
                                        <Text
                                             style={{
                                                  color: focused ? colors.SecondaryColor : colors.gray,
                                                  fontSize: 12,
                                             }}
                                        >
                                             PROFILE
                                        </Text>
                                   </View>
                              ),
                              tabBarLabel: ({ focused }) => null,
                         }}
                    />
               </Tab.Navigator>
          </NavigationContainer>
     );
};

export default BtabNavigation;

const styles = StyleSheet.create({});
