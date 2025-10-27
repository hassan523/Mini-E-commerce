import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Font from '../../assests/fonts/Font';
import colors from '../../assests/Colors/Colors';
import Navigation from '../../utils/NavigationProps/NavigationProps';

const Header = ({ navigation }: { navigation: Navigation }) => {
     return (
          <View style={styles.container}>
               <View style={{ gap: 4 }}>
                    <Text style={styles.name}>Hi Hassan</Text>
                    <Text style={styles.greeting}>Good Morning</Text>
               </View>
               <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../../assests/Images/ProfileImg.png')} alt="profileImage" />
               </TouchableOpacity>
          </View>
     );
};

export default Header;

const styles = StyleSheet.create({
     container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
     },
     name: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: Font.font500,
          color: colors.black,
     },
     greeting: {
          fontSize: 20,
          color: colors.black,
          fontWeight: 'bold',
          fontFamily: Font.font500,
     },
});
