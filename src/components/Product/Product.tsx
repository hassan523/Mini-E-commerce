import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../assests/Colors/Colors';
import Font from '../../assests/fonts/Font';
import { windowWidth } from '../../utils/Dimension/Dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Button from '../Button/Button';
import { GetProductResponse } from '../../redux/Product/ProductTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addToCart, removeFromCart, updateQuantity } from '../../redux/CartSlice/CartSlice';
import ResToast from '../ResToast/ResToast';

const halfWidth = Math.floor(windowWidth / 2);

interface ProductInterface {
     navigation: any;
     product: GetProductResponse;
     activeProductId: number | null;
     onToggle: (id: number) => void;
}
interface cartData {
     id: number;
     title: string;
     image: string;
     price: number | string;
     quantity: number;
}

const Product = ({ navigation, product, activeProductId, onToggle }: ProductInterface) => {
     const [cartData, setCartData] = useState<cartData>({
          id: 0,
          title: '',
          image: '',
          price: 0,
          quantity: 0,
     });
     const [numofProducts, setNumofProducts] = useState(1);

     const dispatch = useDispatch();
     const cartItems = useSelector((state: RootState) => state.cart.items[product.id]);
     const initialQuantity = cartItems?.quantity ?? 0;
     const unitPrice = Number(product.price) || 0;

     const translateY = useSharedValue(-180);
     const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: translateY.value }],
     }));

     const isToggled = activeProductId === product?.id;

     useEffect(() => {
          translateY.value = withTiming(isToggled ? 0 : -180, { duration: 400 });
          if (isToggled) {
               setNumofProducts(initialQuantity);
          }
     }, [isToggled]);

     const handleAddToCart = async () => {
          if (numofProducts === 0) {
               ResToast({ title: 'Select at least one item', type: 'danger' });
               return;
          }

          translateY.value = withTiming(-180, { duration: 500 });
          onToggle(product.id);

          await dispatch(
               addToCart({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: unitPrice,
                    quantity: numofProducts,
               } as any),
          );

          ResToast({ title: 'Cart Added Successfully', type: 'success' });
     };

     const handleIncrease = () => {
          setNumofProducts(prev => {
               const updated = prev + 1;

               setCartData({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: unitPrice,
                    quantity: updated,
               });

               return updated;
          });
     };

     const handleDecrease = () => {
          setNumofProducts(prev => {
               if (prev <= 0) return prev;
               const updated = prev - 1;

               if (updated <= 0) {
                    dispatch(removeFromCart(product.id));
               } else {
                    dispatch(updateQuantity({ id: product.id, quantity: updated }));
               }

               return updated;
          });
     };

     return (
          <TouchableOpacity style={{ gap: 15 }} onPress={() => navigation.navigate('singleProduct', { id: product.id })} disabled={isToggled}>
               <View style={styles.ImgContainer}>
                    <Animated.View style={[styles.box, animatedStyle]}>
                         <View
                              style={{
                                   backgroundColor: colors.white,
                                   flexDirection: 'row',
                                   alignItems: 'center',
                                   justifyContent: 'space-around',
                                   width: '80%',
                                   padding: 3,
                                   borderRadius: 10,
                              }}
                         >
                              <TouchableOpacity onPress={handleDecrease}>
                                   <Entypo name="minus" color={colors.black} size={20} />
                              </TouchableOpacity>
                              <Text style={{ color: colors.black, fontSize: 24 }}>{numofProducts.toString().padStart(2, '0')}</Text>
                              <TouchableOpacity onPress={handleIncrease}>
                                   <Entypo name="plus" color={colors.black} size={20} />
                              </TouchableOpacity>
                         </View>
                         <Button name="Add to Cart" customWidth={halfWidth - 65} customHeight={35} textStyle={{ fontSize: 16, color: colors.white }} onPress={handleAddToCart} />
                    </Animated.View>

                    <Image
                         source={{
                              uri: product.image,
                         }}
                         style={{ width: 150, height: 150, marginBottom: 10 }}
                         resizeMode="contain"
                    />
               </View>

               <View
                    style={{
                         paddingHorizontal: 10,
                         justifyContent: 'space-between',
                         flexDirection: 'row',
                    }}
               >
                    <View>
                         <Text style={styles.title}>{product.title.slice(0, 10)}...</Text>
                         <Text style={styles.price}>${product.price}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onToggle(product.id)}>
                         <Entypo name="shopping-cart" size={24} color={colors.SecondaryColor} />
                    </TouchableOpacity>
               </View>
          </TouchableOpacity>
     );
};

export default Product;

const styles = StyleSheet.create({
     box: {
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'absolute',
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
     },
     ImgContainer: {
          backgroundColor: colors.lightGray,
          borderRadius: 10,
          width: halfWidth - 20,
          height: 180,
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
     },
     title: {
          fontSize: 16,
          color: colors.black,
          fontFamily: Font.font400,
     },
     price: {
          fontSize: 16,
          color: colors.black,
          fontFamily: Font.font500,
          fontWeight: 'bold',
     },
});
