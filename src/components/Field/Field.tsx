import React, { ReactNode, useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assests/Colors/Colors';

interface FieldProps {
  type?: string;
  disabled?: boolean;
  placeHolder?: string;
  value: string | number | undefined;
  onChange: (text: string) => void;
  isIcon?: ReactNode;
  maxLength?: number;
  placeHolderTextColor?: string;
  customClass?: StyleProp<TextStyle>;
  CustomIcon?: ReactNode;
  customDivClass?: StyleProp<ViewStyle>;
  inputWidth?: number;
  divWidth?: number;
  multiline?: boolean;
  iconColor?: string;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
}

const Field: React.FC<FieldProps> = props => {
  const {
    type = 'text',
    disabled = false,
    placeHolder = '',
    value,
    onChange,
    isIcon,
    maxLength,
    placeHolderTextColor = 'black',
    customClass,
    CustomIcon,
    customDivClass,
    inputWidth,
    divWidth,
    multiline = false,
    iconColor = 'black',
    textAlignVertical = 'auto',
  } = props;

  const [isPass, setIsPass] = useState<boolean>(true);

  const getInputType = (): KeyboardTypeOptions => {
    switch (type) {
      case 'password':
        return 'default';
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <>
      {type === 'password' ? (
        <View
          style={[
            styles.div,
            { width: divWidth ? divWidth : '90%' },
            customDivClass,
          ]}
        >
          {CustomIcon ? CustomIcon : null}
          <TextInput
            style={[
              customClass ? customClass : styles.input,
              { width: inputWidth ? inputWidth : '90%', borderWidth: 0 },
            ]}
            placeholder={placeHolder || 'Password'}
            placeholderTextColor={placeHolderTextColor}
            value={value != null ? value.toString() : undefined}
            secureTextEntry={isPass}
            editable={!disabled}
            maxLength={maxLength}
            onChangeText={onChange}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setIsPass(!isPass)}
            style={{ width: '100%' }}
          >
            <Icon
              name={isPass ? 'eye-slash' : 'eye'}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>
      ) : type === 'email' && isIcon ? (
        <View
          style={[
            styles.div,
            customDivClass,
            { width: divWidth ? divWidth : '90%' },
          ]}
        >
          <EmailIcon name="email" size={20} color="gray" />
          <TextInput
            style={[
              styles.input,
              {
                width: inputWidth ? inputWidth : '95%',
                borderWidth: 0,
              },
              customClass,
            ]}
            placeholder={placeHolder || 'Email'}
            placeholderTextColor={placeHolderTextColor}
            value={value != null ? value.toString() : undefined}
            keyboardType={getInputType()}
            editable={!disabled}
            maxLength={maxLength}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        </View>
      ) : (
        <TextInput
          style={[
            customClass ? customClass : styles.input,
            { width: inputWidth ? inputWidth : '90%' },
          ]}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderTextColor}
          value={value != null ? value.toString() : undefined}
          keyboardType={getInputType()}
          editable={!disabled}
          maxLength={maxLength}
          onChangeText={onChange}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          autoCapitalize="none"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: colors.PrimaryColor,
  },
  div: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.PrimaryColor,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default Field;
