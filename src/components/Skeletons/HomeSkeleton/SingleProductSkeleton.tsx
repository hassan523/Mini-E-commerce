import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Skeleton from '../Skeleton';
import { windowWidth } from '../../../utils/Dimension/Dimension';
import colors from '../../../assests/Colors/Colors';

const SingleProductSkeleton = () => {
     const halfWidth = Math.floor(windowWidth / 2);

     return (
          <View style={styles.cardWrapper}>
               <View style={styles.cardText}>
                    <Skeleton width={windowWidth - 20} height={300} borderRadius={5} />
                    <View style={{ gap: 20 }}>
                         <View style={{ gap: 10 }}>
                              <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                              <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                              <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                         </View>
                         <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                              <Skeleton width={100} height={15} borderRadius={5} />
                              <Skeleton width={100} height={15} borderRadius={5} />
                         </View>
                    </View>
                    <View style={{ gap: 10 }}>
                         <Skeleton width={100} height={20} borderRadius={5} />
                         <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                         <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                         <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                         <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                         <Skeleton width={windowWidth - 20} height={15} borderRadius={5} />
                    </View>
                    <View style={{ gap: 20 }}>
                         <Skeleton width={windowWidth - 20} height={50} borderRadius={5} />
                         <Skeleton width={windowWidth - 20} height={50} borderRadius={5} />
                    </View>
               </View>
          </View>
     );
};

export default SingleProductSkeleton;

const styles = StyleSheet.create({
     cardWrapper: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: 20,
     },
     cardText: {
          gap: 30,
          width: windowWidth,
     },
});
