import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { windowHeight, windowWidth } from '../../../utils/Dimension/Dimension';
import Font from '../../../assests/fonts/Font';
import MainLayout from '../../../Layout/MainLayout';
import CartList from '../../../components/CartList/CartList';
import colors from '../../../assests/Colors/Colors';
import Button from '../../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeFromCart, updateQuantity } from '../../../redux/CartSlice/CartSlice';
import Ismessage from '../../../components/IsMessage/Ismessage';
import Navigation from '../../../utils/NavigationProps/NavigationProps';

const Cart = ({ navigation }: { navigation: Navigation }) => {
     const dispatch = useDispatch();
     const CartItem = useSelector((state: RootState) => state.cart.items);
     const cartArray = useMemo(() => Object.values(CartItem), [CartItem]);

     const subtotal = useMemo(() => {
          return cartArray.reduce((sum, it) => sum + (Number(it.totalPrice) || 0), 0);
     }, [cartArray]);

     const delivery = cartArray.length === 0 ? 0 : 1.98;

     const handleIncrease = (id: number, currentQty: number) => {
          dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
     };

     const handleDecrease = (id: number, currentQty: number) => {
          const newQty = currentQty - 1;
          if (newQty <= 0) {
               dispatch(removeFromCart(id));
          } else {
               dispatch(updateQuantity({ id, quantity: newQty }));
          }
     };

     const handleRemove = (id: number) => {
          dispatch(removeFromCart(id));
     };

     return (
          <MainLayout>
               {/* Header */}
               <View style={styles.container}>
                    <View style={{ gap: 20 }}>
                         <Text style={styles.header}>shopping CART</Text>

                         <FlatList
                              data={cartArray}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({ item }) => <CartList cartData={item} increase={handleIncrease} decreace={handleDecrease} remove={handleRemove} navigation={navigation} />}
                              ListEmptyComponent={<Ismessage text="Cart Is Empty" height={windowHeight / 2.2} />}
                              showsVerticalScrollIndicator={false}
                              contentContainerStyle={{ gap: 5 }}
                              style={{
                                   height: windowHeight / 2.2,
                              }}
                         />
                    </View>

                    <View style={styles.total}>
                         <View style={{ gap: 5 }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                   <Text style={styles.subtotal}>Subtotal</Text>
                                   <Text style={styles.price}>${subtotal.toFixed(2)}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                   <Text style={styles.subtotal}>Delivery</Text>
                                   <Text style={styles.price}>${delivery}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                   <Text style={styles.subtotal}>Total</Text>
                                   <Text style={styles.price}>${(subtotal + delivery).toFixed(2)}</Text>
                              </View>
                         </View>
                         <View style={{ marginTop: 20, alignItems: 'center' }}>
                              <Button name="Proceed" customWidth={windowWidth - 100} />
                         </View>
                    </View>
               </View>
          </MainLayout>
     );
};

export default Cart;

const styles = StyleSheet.create({
     container: {
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: windowHeight - 150,
     },
     header: {
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: Font.font500,
          textTransform: 'uppercase',
     },
     total: {
          backgroundColor: colors.lightGray,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
     },
     subtotal: {
          color: colors.textColor,
          fontSize: 16,
          fontFamily: Font.font400,
     },
     price: {
          color: colors.textColor,
          fontSize: 16,
          fontFamily: Font.font500,
          fontWeight: 'bold',
     },
});
