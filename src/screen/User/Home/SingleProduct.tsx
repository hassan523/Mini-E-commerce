import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainLayout from '../../../Layout/MainLayout';
import { windowWidth } from '../../../utils/Dimension/Dimension';
import colors from '../../../assests/Colors/Colors';
import Font from '../../../assests/fonts/Font';
import Button from '../../../components/Button/Button';
import Navigation from '../../../utils/NavigationProps/NavigationProps';
import { useGetSingleProduct } from '../../../model/Products/ProductModel';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/CartSlice/CartSlice';
import ResToast from '../../../components/ResToast/ResToast';
import SingleProductSkeleton from '../../../components/Skeletons/HomeSkeleton/SingleProductSkeleton';

const SingleProduct = ({ navigation, route }: { navigation: Navigation; route: any }) => {
     const { id } = route.params;
     const dispatch = useDispatch();

     const { data, isLoading } = useGetSingleProduct(id);

     const handleAddToCart = async () => {
          await dispatch(
               addToCart({
                    id: data?.id,
                    title: data?.title,
                    image: data?.image,
                    price: data?.price,
                    quantity: 1,
               } as any),
          );

          ResToast({ title: 'Cart Added Successfully', type: 'success' });
     };

     return (
          <MainLayout>
               <ScrollView contentContainerStyle={{ gap: 20 }} showsVerticalScrollIndicator={false}>
                    {isLoading ? (
                         <SingleProductSkeleton />
                    ) : (
                         <>
                              <View style={styles.imgWrapper}>
                                   <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Ionicons name="arrow-back" size={30} color="black" />
                                   </TouchableOpacity>
                                   <View style={{ alignItems: 'center' }}>
                                        <Image
                                             source={{
                                                  uri: data?.image,
                                             }}
                                             style={{ width: windowWidth / 1.2, height: 250, marginBottom: 10 }}
                                             resizeMode="contain"
                                        />
                                   </View>
                              </View>
                              <View style={{ paddingHorizontal: 15, gap: 30 }}>
                                   <View
                                        style={{
                                             flexDirection: 'row',
                                             justifyContent: 'space-between',
                                             alignItems: 'flex-start',
                                        }}
                                   >
                                        <View style={{ flexWrap: 'wrap', gap: 8 }}>
                                             <View>
                                                  <Text
                                                       style={{
                                                            fontSize: 24,
                                                            fontFamily: Font.font500,
                                                            fontWeight: 'bold',
                                                       }}
                                                  >
                                                       {data?.title}
                                                  </Text>
                                             </View>
                                             <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                                  <Text
                                                       style={{
                                                            fontSize: 24,
                                                            fontFamily: Font.font500,
                                                            fontWeight: 'bold',
                                                            color: colors.SecondaryColor,
                                                       }}
                                                  >
                                                       $199.00
                                                  </Text>
                                                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                       <AntDesign name="star" size={24} color={colors.SecondaryColor} />
                                                       <Text
                                                            style={{
                                                                 color: colors.SecondaryColor,
                                                                 fontFamily: Font.font400,
                                                                 lineHeight: 30,
                                                            }}
                                                       >
                                                            {data?.rating.rate} ({data?.rating.count} reviews)
                                                       </Text>
                                                  </View>
                                             </View>
                                        </View>
                                   </View>
                                   <View>
                                        <Text
                                             style={{
                                                  fontFamily: Font.font400,
                                                  fontSize: 18,
                                                  color: colors.textColor,
                                             }}
                                        >
                                             Details
                                        </Text>
                                        <Text
                                             style={{
                                                  fontFamily: Font.font400,
                                                  fontSize: 12,
                                                  color: colors.gray,
                                                  letterSpacing: 0.5,
                                             }}
                                        >
                                             {data?.description}
                                        </Text>
                                   </View>
                                   <View style={{ gap: 10 }}>
                                        <Button name="Buy Now" customWidth={windowWidth - 65} />
                                        <Button
                                             name="Add To Cart"
                                             customWidth={windowWidth - 65}
                                             mainStyle={styles.btnStyle}
                                             bgColor={colors.white}
                                             textStyle={styles.btnText}
                                             onPress={handleAddToCart}
                                        />
                                   </View>
                              </View>
                         </>
                    )}
               </ScrollView>
          </MainLayout>
     );
};

export default SingleProduct;

const styles = StyleSheet.create({
     imgWrapper: {
          backgroundColor: colors.lightGray,
          padding: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          gap: 40,
     },
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
