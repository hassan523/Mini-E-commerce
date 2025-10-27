import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../assests/Colors/Colors';
import Font from '../../assests/fonts/Font';

interface ButtonProps {
  name: string;
  onPress?: () => void;
  isLoading?: boolean;
  loadingName?: string;
  bgColor?: string;
  icon?: ReactNode;
  iconLeft?: boolean;
  iconRight?: boolean;
  mainStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  customWidth?: number;
  customHeight?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
  const {
    name,
    onPress,
    isLoading,
    loadingName,
    icon,
    iconLeft,
    iconRight = false,
    mainStyle,
    textStyle,
    customWidth,
    customHeight,
    disabled,
    bgColor,
  } = props;
  return icon ? (
    <TouchableOpacity
      style={[
        mainStyle ? mainStyle : styles.ContainerIcon,
        {
          width: customWidth ? customWidth : 200,
          height: customHeight ? customHeight : 50,
          backgroundColor: bgColor ? bgColor : colors.SecondaryColor,
        },
      ]}
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled}
    >
      {iconRight ? (
        iconRight && icon ? (
          icon
        ) : (
          <Entypo name="chevron-left" color={colors.white} size={30} />
        )
      ) : null}

      {isLoading ? (
        <Text
          style={
            textStyle
              ? textStyle
              : { color: colors.white, fontSize: 18, fontFamily: Font.font500 }
          }
        >
          {loadingName ? loadingName : 'Loading...'}
        </Text>
      ) : (
        <Text
          style={
            textStyle
              ? textStyle
              : { color: colors.white, fontSize: 18, fontFamily: Font.font500 }
          }
        >
          {name || 'Button'}
        </Text>
      )}
      {iconLeft ? (
        iconLeft && icon ? (
          icon
        ) : (
          <Entypo name="chevron-left" color={colors.white} size={30} />
        )
      ) : null}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        mainStyle ? mainStyle : styles.Container,
        {
          width: customWidth ? customWidth : 200,
          height: customHeight ? customHeight : 50,
          backgroundColor: bgColor ? bgColor : colors.SecondaryColor,
        },
      ]}
      onPress={isLoading ? () => {} : onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <Text
          style={
            textStyle
              ? textStyle
              : {
                  color: colors.white,
                  fontSize: 18,
                  fontFamily: Font.font500,
                  lineHeight: 24,
                }
          }
        >
          {loadingName ? loadingName : 'Loading...'}
        </Text>
      ) : (
        <Text
          style={
            textStyle
              ? textStyle
              : {
                  color: colors.white,
                  fontSize: 18,
                  fontFamily: Font.font500,
                  lineHeight: 24,
                }
          }
        >
          {name || 'Button'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.SecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ContainerIcon: {
    backgroundColor: colors.SecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 35,
    gap: 20,
  },
});

export default Button;
