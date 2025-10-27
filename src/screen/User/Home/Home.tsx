import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Field from '../../../components/Field/Field';
import Header from '../../../components/Header/Header';
import { windowHeight, windowWidth } from '../../../utils/Dimension/Dimension';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../../assests/Colors/Colors';
import Product from '../../../components/Product/Product';
import MainLayout from '../../../Layout/MainLayout';
import { useGetProducts } from '../../../model/Products/ProductModel';
import { GetProductResponse } from '../../../redux/Product/ProductTypes';
import ProductSkeleton from '../../../components/Skeletons/HomeSkeleton/ProductSkeleton';
import Ismessage from '../../../components/IsMessage/Ismessage';

const Home = ({ navigation }: { navigation: any }) => {
     const [products, setProducts] = useState<GetProductResponse[]>([]);
     const [searchText, setSearchText] = useState<string>('');
     const [activeProductId, setActiveProductId] = useState<number | null>(null);
     const [debouncedText, setDebouncedText] = useState<string>('');
     const [refreshing, setRefresing] = useState(false);

     const GetProductData = useGetProducts();

     useEffect(() => {
          if (GetProductData.data && products.length === 0) {
               setProducts(GetProductData.data);
          }
     }, [GetProductData.data]);

     useEffect(() => {
          const timer = setTimeout(() => {
               setDebouncedText(searchText);
          }, 1000);

          return () => clearTimeout(timer);
     }, [searchText]);

     const filteredProducts = useMemo(() => {
          if (!debouncedText.trim()) return products;
          return products.filter(item => item.title.toLowerCase().includes(debouncedText.toLowerCase()));
     }, [debouncedText, products]);

     const handleToggle = (productId: number) => {
          setActiveProductId(prev => (prev === productId ? null : productId));
     };

     const onRefresh = async () => {
          setRefresing(true);
          await GetProductData?.refetch?.();
          setTimeout(() => {
               setRefresing(false);
          }, 2000);
     };

     const renderItem = useCallback(
          ({ item }: { item: GetProductResponse }) => <Product navigation={navigation} product={item} activeProductId={activeProductId} onToggle={handleToggle} />,
          [activeProductId, navigation, handleToggle],
     );

     return (
          <MainLayout>
               <Header navigation={navigation} />
               {/* Search Bar */}
               <View
                    style={{
                         flexDirection: 'row',
                         justifyContent: 'space-between',
                         alignItems: 'center',
                    }}
               >
                    <Field placeHolder="Search Product" value={searchText} onChange={setSearchText} inputWidth={windowWidth * 0.8} placeHolderTextColor={colors.gray} />
                    <View
                         style={{
                              backgroundColor: colors.black,
                              padding: 12,
                              borderRadius: 10,
                         }}
                    >
                         <FontAwesome size={24} name="search" color={colors.white} />
                    </View>
               </View>

               {/* product */}
               <View>
                    <FlatList
                         data={GetProductData.isLoading ? ([1, 2, 3, 4, 5, 6] as unknown as GetProductResponse[]) : filteredProducts}
                         renderItem={GetProductData.isLoading ? () => <ProductSkeleton /> : renderItem}
                         keyExtractor={(item, index) => (GetProductData.isLoading ? index.toString() : item.id?.toString())}
                         ListEmptyComponent={<Ismessage text="No Product Available" height={windowHeight / 1.5} />}
                         numColumns={2}
                         showsVerticalScrollIndicator={false}
                         columnWrapperStyle={{
                              justifyContent: 'space-between',
                              marginBottom: 20,
                         }}
                         contentContainerStyle={{
                              paddingBottom: 300,
                         }}
                         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.PrimaryColor]} />}
                    />
               </View>
          </MainLayout>
     );
};

export default Home;

const styles = StyleSheet.create({});
