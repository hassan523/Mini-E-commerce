import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/Features/authState';
import MainLayout from '../../../Layout/MainLayout';
import colors from '../../../assests/Colors/Colors';
import Field from '../../../components/Field/Field';
import { RootState } from '../../../redux/store';
import { windowHeight, windowWidth } from '../../../utils/Dimension/Dimension';
import Button from '../../../components/Button/Button';
import Font from '../../../assests/fonts/Font';

const Profile = () => {
     const dispatch = useDispatch();
     const selector = useSelector((state: RootState) => state?.userData?.data);
     console.log(selector);
     return (
          <MainLayout>
               <View style={{ alignItems: 'center', gap: 40, height: windowHeight - 150, justifyContent: 'center' }}>
                    <View
                         style={{
                              borderWidth: 1,
                              width: 150,
                              height: 150,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 100,
                              backgroundColor: colors.PrimaryColor,
                         }}
                    >
                         <Image source={require('../../../assests/Images/ProfileImg.png')} style={{ width: 80, height: 100 }} resizeMode="contain" />
                    </View>
                    <View style={{ gap: 25 }}>
                         <View style={{ gap: 5 }}>
                              <Text style={{ color: colors.textColor, fontSize: 18, paddingHorizontal: 10 }}>Username</Text>
                              <Field placeHolder="Username" value={selector?.username} onChange={() => null} disabled inputWidth={windowWidth * 0.9} placeHolderTextColor={colors.gray} />
                         </View>
                         <View style={{ gap: 5 }}>
                              <Text style={{ color: colors.textColor, fontSize: 18, paddingHorizontal: 10 }}>Email</Text>
                              <Field placeHolder="Email" value={selector?.email} onChange={() => null} disabled inputWidth={windowWidth * 0.9} placeHolderTextColor={colors.gray} />
                         </View>
                         <View style={{ gap: 5 }}>
                              <Text style={{ color: colors.textColor, fontSize: 18, paddingHorizontal: 10 }}>Phone</Text>
                              <Field placeHolder="Phone" value={selector?.phone} onChange={() => null} disabled inputWidth={windowWidth * 0.9} placeHolderTextColor={colors.gray} />
                         </View>
                    </View>
                    <Button name="Log Out" customWidth={windowWidth - 65} mainStyle={styles.btnStyle} bgColor={colors.white} textStyle={styles.btnText} onPress={() => dispatch(logout())} />
               </View>
          </MainLayout>
     );
};

export default Profile;

const styles = StyleSheet.create({
     btnStyle: {
          backgroundColor: colors.lightGray,
          borderWidth: 1,
          borderColor: colors.SecondaryColor,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
     },
     btnText: {
          color: colors.SecondaryColor,
          fontFamily: Font.font500,
          fontSize: 18,
     },
});
