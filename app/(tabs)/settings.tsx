import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

const settingsSections = [
  {
    title: 'Account',
    items: [
      {
        id: 'profile',
        title: 'Profile',
        subtitle: 'Manage your personal information',
        icon: '👤',
        type: 'navigate',
      },
      {
        id: 'change_password',
        title: 'Change Password',
        subtitle: 'Update your account password',
        icon: '🔒',
        type: 'navigate',
      },
    ],
  },
  {
    title: 'Notifications',
    items: [
      {
        id: 'push_notifications',
        title: 'Push Notifications',
        subtitle: 'Receive alerts and updates',
        icon: '🔔',
        type: 'toggle',
        value: true,
      },
      {
        id: 'critical_alerts',
        title: 'Critical Alerts Only',
        subtitle: 'Only receive emergency alerts',
        icon: '⚠️',
        type: 'toggle',
        value: false,
      },
      {
        id: 'email_notifications',
        title: 'Email Notifications',
        subtitle: 'Receive updates via email',
        icon: '📧',
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    title: 'Location & Privacy',
    items: [
      {
        id: 'location_services',
        title: 'Location Services',
        subtitle: 'Allow location access for reports',
        icon: '📍',
        type: 'toggle',
        value: true,
      },
      {
        id: 'location_permissions',
        title: 'Location Permissions',
        subtitle: 'Manage location access settings',
        icon: '🗺️',
        type: 'navigate',
      },
    ],
  },
  {
    title: 'App Settings',
    items: [
      {
        id: 'language',
        title: 'Language',
        subtitle: 'English',
        icon: '🌐',
        type: 'navigate',
      },
      {
        id: 'theme',
        title: 'Theme',
        subtitle: 'System Default',
        icon: '🎨',
        type: 'navigate',
      },
      {
        id: 'offline_mode',
        title: 'Offline Mode',
        subtitle: 'Work without internet connection',
        icon: '📱',
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        id: 'help',
        title: 'Help & Support',
        subtitle: 'Get help and contact support',
        icon: '❓',
        type: 'navigate',
      },
      {
        id: 'about',
        title: 'About Us',
        subtitle: 'Learn more about Samudra Sachet',
        icon: 'ℹ️',
        type: 'navigate',
      },
      {
        id: 'privacy_policy',
        title: 'Privacy Policy',
        subtitle: 'Read our privacy policy',
        icon: '🛡️',
        type: 'navigate',
      },
      {
        id: 'terms',
        title: 'Terms of Service',
        subtitle: 'Read our terms of service',
        icon: '📄',
        type: 'navigate',
      },
    ],
  },
];

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    push_notifications: true,
    critical_alerts: false,
    email_notifications: true,
    location_services: true,
    offline_mode: true,
  });
  const { logout } = useAuth();

  const handleToggle = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !(prev as any)[settingId],
    }));
  };

  const handleNavigate = (item: any) => {
    switch (item.id) {
      case 'profile':
        Alert.alert('Profile', 'Profile management will be implemented');
        break;
      case 'change_password':
        Alert.alert('Change Password', 'Password change functionality will be implemented');
        break;
      case 'location_permissions':
        Alert.alert('Location Permissions', 'Location permission settings will be implemented');
        break;
      case 'language':
        Alert.alert('Language', 'Language selection will be implemented');
        break;
      case 'theme':
        Alert.alert('Theme', 'Theme selection will be implemented');
        break;
      case 'help':
        Alert.alert('Help & Support', 'Help and support functionality will be implemented');
        break;
      case 'about':
        Alert.alert(
          'About Samudra Sachet',
          'Samudra Sachet (समुद्र सचेत) - Coastal Guardian\n\nVersion 1.0.0\n\nA mobile application for coastal communities to report ocean hazards and receive critical alerts.\n\nDeveloped for disaster-prone coastal areas to ensure safety and preparedness.',
          [{ text: 'OK' }]
        );
        break;
      case 'privacy_policy':
        Alert.alert('Privacy Policy', 'Privacy policy will be implemented');
        break;
      case 'terms':
        Alert.alert('Terms of Service', 'Terms of service will be implemented');
        break;
      default:
        Alert.alert('Coming Soon', 'This feature will be available in a future update');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={() => {
        if (item.type === 'navigate') {
          handleNavigate(item);
        } else if (item.type === 'toggle') {
          handleToggle(item.id);
        }
      }}
    >
      <View style={styles.settingIcon}>
        <Text style={styles.settingIconText}>{item.icon}</Text>
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.settingAction}>
        {item.type === 'toggle' ? (
          <Switch
            value={(settings as any)[item.id] || false}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{ false: AppColors.lightGrey, true: AppColors.primaryBackground }}
            thumbColor={AppColors.textPrimary}
          />
        ) : (
          <Text style={styles.chevron}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50, // Increased from 15 to provide more space from status bar
    paddingBottom: 20, // Increased from 15 for better spacing
    backgroundColor: AppColors.primaryBackground,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: AppColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: AppColors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.darkTeal,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: AppColors.textPrimary,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingIconText: {
    fontSize: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.darkTeal,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  settingAction: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 20,
    color: AppColors.textSecondary,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.lightGrey,
    marginLeft: 52,
  },
  signOutSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  signOutButton: {
    backgroundColor: AppColors.error,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signOutButtonText: {
    color: AppColors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
