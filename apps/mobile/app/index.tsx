/**
 * GhostTip Mobile - Home Screen
 */

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>👻</Text>
          <Text style={styles.brandText}>GhostTip</Text>
        </View>

        {/* Hero */}
        <Text style={styles.title}>Anonymous Tipping</Text>
        <Text style={styles.subtitle}>Made Simple</Text>

        <Text style={styles.description}>
          Aggregate all your payment methods into one anonymous link. Protect
          your privacy while accepting tips.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/auth/register" asChild>
            <Pressable style={styles.buttonPrimary}>
              <Text style={styles.buttonPrimaryText}>Get Started</Text>
            </Pressable>
          </Link>

          <Link href="/auth/login" asChild>
            <Pressable style={styles.buttonSecondary}>
              <Text style={styles.buttonSecondaryText}>Sign In</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e14',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 80,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    color: '#e6e6e6',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#b3b3b3',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  buttonPrimary: {
    backgroundColor: '#00ffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#0a0e14',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#00ffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
