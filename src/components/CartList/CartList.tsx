import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../assests/Colors/Colors';
import Font from '../../assests/fonts/Font';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Navigation from '../../utils/NavigationProps/NavigationProps';

const CartList = ({
     cartData,
     increase,
     decreace,
     remove,
     navigation,
}: {
     cartData: any;
     increase: (id: number, currentQty: number) => void;
     decreace: (id: number, currentQty: number) => void;
     remove: (id: number) => void;
     navigation: Navigation;
}) => {
     const [numofProducts, setNumofProducts] = useState<number>(0);

     useEffect(() => {
          setNumofProducts(cartData.quantity);
     }, [cartData]);

     return (
          <View style={styles.cartListContainer}>
               <TouchableOpacity style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }} onPress={() => navigation.navigate('singleProduct', { id: cartData.id })}>
                    <View
                         style={{
                              padding: 5,
                              backgroundColor: colors.lightGray,
                              borderRadius: 10,
                         }}
                    >
                         <Image
                              source={{
                                   uri: cartData.image,
                              }}
                              style={{ width: 40, height: 40 }}
                              resizeMode="contain"
                         />
                    </View>
                    <View style={{ gap: 4 }}>
                         <Text style={styles.title}>{cartData.title.slice(0, 12)}</Text>
                         <Text style={styles.price}> ${cartData.unitPrice}</Text>
                    </View>
               </TouchableOpacity>
               <View
                    style={{
                         alignItems: 'flex-end',
                         justifyContent: 'space-around',
                         padding: 3,
                         gap: 5,
                    }}
               >
                    <View
                         style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 15,
                         }}
                    >
                         <TouchableOpacity onPress={() => decreace(cartData.id, cartData.quantity)}>
                              <Entypo name="minus" color={colors.black} size={16} />
                         </TouchableOpacity>
                         <Text style={{ color: colors.black, fontSize: 20 }}>{numofProducts.toString().padStart(2, '0')}</Text>
                         <TouchableOpacity onPress={() => increase(cartData.id, cartData.quantity)}>
                              <Entypo name="plus" color={colors.black} size={16} />
                         </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => remove(cartData.id)}>
                         <FontAwesome name="trash-o" size={24} color={colors.gray} />
                    </TouchableOpacity>
               </View>
          </View>
     );
};

export default CartList;

const styles = StyleSheet.create({
     cartListContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
     },
     title: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: Font.font500,
          color: colors.black,
     },
     price: {
          color: colors.gray,
          fontSize: 15,
          fontFamily: Font.font400,
     },
});
