import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '@/constants/theme';

export default function SplashScreen() {
  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>Samudra Sathi</Text>
        </View>
        <Text style={styles.appName}>Samudra Sachet</Text>
        <Text style={styles.appNameHindi}>(समुद्र सचेत)</Text>
        <Text style={styles.tagline}>Coastal Guardian</Text>
      </View>
      <ActivityIndicator size="large" color={AppColors.textPrimary} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: AppColors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    textAlign: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.textPrimary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  appNameHindi: {
    fontSize: 20,
    color: AppColors.textSecondary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    color: AppColors.textAccent,
    fontWeight: '500',
    letterSpacing: 1,
  },
  loader: {
    marginTop: 20,
  },
});
