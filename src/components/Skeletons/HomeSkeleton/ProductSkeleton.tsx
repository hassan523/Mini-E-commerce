import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Skeleton from '../Skeleton';
import { windowWidth } from '../../../utils/Dimension/Dimension';
import colors from '../../../assests/Colors/Colors';

const ProductSkeleton = () => {
     const halfWidth = Math.floor(windowWidth / 2);

     return (
          <View style={styles.cardWrapper}>
               <View style={styles.cardText}>
                    <Skeleton width={halfWidth - 30} height={180} borderRadius={5} />
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 30 }}>
                         <View style={{ gap: 3 }}>
                              <Skeleton width={100} height={10} borderRadius={5} />
                              <Skeleton width={50} height={10} borderRadius={5} />
                         </View>
                         <Skeleton width={30} height={30} borderRadius={5} />
                    </View>
               </View>
          </View>
     );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
     cardWrapper: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: 20,
     },
     cardText: {
          gap: 15,
          alignItems: 'flex-start',
     },
});
