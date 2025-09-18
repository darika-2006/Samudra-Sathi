import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '@/constants/theme';
import DashboardCard from '@/components/DashboardCard';

export default function HomeScreen() {
  const handleSOSPress = () => {
    Alert.alert(
      'SOS Emergency',
      'This will initiate an emergency report. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Report Emergency',
          style: 'destructive',
          onPress: () => {
            // Navigate to emergency report screen
            router.push('/report-hazard?emergency=true');
          },
        },
      ]
    );
  };

  const handleQuickVoiceReport = () => {
    router.push('/report-hazard');
  };

  const handleNearbyIncidents = () => {
    // Navigate to a map or list view of nearby incidents
    Alert.alert('Nearby Incidents', 'This feature will show incidents in your local area.');
  };

  const handleCriticalAlerts = () => {
    // Navigate to alerts tab
    router.push('/(tabs)/alerts');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Samudra Sathi Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Samudra Sathi</Text>
        </View>
      </View>

      {/* Main Content Area with Dashboard Cards */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboardContainer}>
          <DashboardCard
            icon="🎤"
            title="Quick Voice Report"
            subtitle="Tap here to send an instant voice note."
            onPress={handleQuickVoiceReport}
          />
          
          <DashboardCard
            icon="📍"
            title="Nearby Incidents"
            subtitle="See reports from your local community."
            onPress={handleNearbyIncidents}
          />
          
          <DashboardCard
            icon="🔔"
            title="View Critical Alerts"
            subtitle="Check for new warnings and updates."
            onPress={handleCriticalAlerts}
          />
        </View>
      </ScrollView>

      {/* SOS Floating Action Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50, // Increased from 20 to provide more space from status bar
    paddingBottom: 20, // Increased from 10 for better spacing
    backgroundColor: '#FFFFFF', // Ensure consistent background
  },
  logoContainer: {
    alignSelf: 'flex-start',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.primaryBackground,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dashboardContainer: {
    paddingTop: 20,
    paddingBottom: 100, // Extra padding to account for the floating SOS button
  },
  sosButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: AppColors.sosButton,
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
  },
  sosButtonText: {
    color: AppColors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
