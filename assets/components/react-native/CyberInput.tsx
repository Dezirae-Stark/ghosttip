import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';

export interface CyberInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const CyberInput: React.FC<CyberInputProps> = ({
  label,
  error,
  containerStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        <TextInput
          {...textInputProps}
          style={[styles.input, textInputProps.style]}
          placeholderTextColor="#666666"
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
        />
      </View>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: 'rgba(26, 31, 46, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  inputContainerFocused: {
    borderColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainerError: {
    borderColor: '#FF0055',
  },
  input: {
    color: '#E6E6E6',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  error: {
    color: '#FF0055',
    fontSize: 12,
    marginTop: 4,
  },
});
