import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { windowWidth } from '../utils/Dimension/Dimension';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        flex: 1,
        width: windowWidth,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <View style={{ gap: 20, width: windowWidth - 20, paddingVertical: 20 }}>
        {children}
      </View>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
