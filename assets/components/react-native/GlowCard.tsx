import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: string;
  style?: ViewStyle;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  glowColor = '#00FFFF',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.card,
          {
            borderColor: glowColor,
            shadowColor: glowColor,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
    backgroundColor: 'rgba(15, 20, 25, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
});
