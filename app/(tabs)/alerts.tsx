import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '@/constants/theme';

// Mock data for alerts
const mockAlerts = [
  {
    id: '1',
    title: 'Cyclone Warning - Category 3',
    message: 'Cyclone Biparjoy is approaching the coast. Expected landfall in 24 hours. Evacuate immediately.',
    timestamp: '2024-01-15T14:30:00Z',
    priority: 'critical',
    isRead: false,
    type: 'cyclone',
    icon: '🌪️',
    location: 'Coastal Areas - 50km radius',
  },
  {
    id: '2',
    title: 'Tsunami Alert',
    message: 'Tsunami warning issued for coastal regions. Move to higher ground immediately.',
    timestamp: '2024-01-15T12:15:00Z',
    priority: 'critical',
    isRead: false,
    type: 'tsunami',
    icon: '🌊',
    location: 'All Coastal Areas',
  },
  {
    id: '3',
    title: 'Heavy Rain Warning',
    message: 'Heavy rainfall expected for the next 6 hours. Avoid low-lying areas.',
    timestamp: '2024-01-14T18:45:00Z',
    priority: 'high',
    isRead: true,
    type: 'rain',
    icon: '🌧️',
    location: 'Northern Coastal Region',
  },
  {
    id: '4',
    title: 'Storm Surge Alert',
    message: 'Storm surge of 2-3 meters expected during high tide.',
    timestamp: '2024-01-14T16:20:00Z',
    priority: 'high',
    isRead: true,
    type: 'storm',
    icon: '⚡',
    location: 'Harbor Area',
  },
  {
    id: '5',
    title: 'High Wind Warning',
    message: 'Winds up to 60 km/h expected. Secure loose objects.',
    timestamp: '2024-01-13T20:10:00Z',
    priority: 'medium',
    isRead: true,
    type: 'wind',
    icon: '💨',
    location: 'Coastal Fishing Villages',
  },
  {
    id: '6',
    title: 'Flood Watch',
    message: 'River levels rising. Monitor water levels closely.',
    timestamp: '2024-01-13T14:30:00Z',
    priority: 'medium',
    isRead: true,
    type: 'flood',
    icon: '🌊',
    location: 'River Delta Region',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return AppColors.error;
    case 'high':
      return AppColors.warning;
    case 'medium':
      return AppColors.info;
    case 'low':
      return AppColors.success;
    default:
      return AppColors.textSecondary;
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'CRITICAL';
    case 'high':
      return 'HIGH';
    case 'medium':
      return 'MEDIUM';
    case 'low':
      return 'LOW';
    default:
      return 'UNKNOWN';
  }
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all'); // all, unread, critical

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleAlertPress = (alert: any) => {
    // Mark as read
    setAlerts(prevAlerts =>
      prevAlerts.map(a =>
        a.id === alert.id ? { ...a, isRead: true } : a
      )
    );

    Alert.alert(
      alert.title,
      `${alert.message}\n\nLocation: ${alert.location}\n\nTime: ${formatTimestamp(alert.timestamp)}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Share', onPress: () => console.log('Share alert:', alert.id) },
      ]
    );
  };

  const handleMarkAllRead = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => ({ ...alert, isRead: true }))
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread':
        return !alert.isRead;
      case 'critical':
        return alert.priority === 'critical';
      default:
        return true;
    }
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(alert => alert.priority === 'critical').length;

  const renderAlertItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.alertItem,
        !item.isRead && styles.unreadAlert,
      ]}
      onPress={() => handleAlertPress(item)}
    >
      <View style={styles.alertHeader}>
        <View style={styles.alertIconContainer}>
          <Text style={styles.alertIcon}>{item.icon}</Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <View style={styles.alertContent}>
          <View style={styles.alertTitleRow}>
            <Text style={styles.alertTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
              <Text style={styles.priorityText}>{getPriorityText(item.priority)}</Text>
            </View>
          </View>
          <Text style={styles.alertMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <View style={styles.alertFooter}>
            <Text style={styles.alertLocation}>{item.location}</Text>
            <Text style={styles.alertTimestamp}>{formatTimestamp(item.timestamp)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = (filterType: string, label: string, count: number) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterType && styles.activeFilterButton,
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === filterType && styles.activeFilterButtonText,
      ]}>
        {label} {count > 0 && `(${count})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Critical Alerts</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllRead} style={styles.markReadButton}>
            <Text style={styles.markReadButtonText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All', alerts.length)}
        {renderFilterButton('unread', 'Unread', unreadCount)}
        {renderFilterButton('critical', 'Critical', criticalCount)}
      </View>

      {/* Alerts List */}
      <FlatList
        data={filteredAlerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No Alerts</Text>
            <Text style={styles.emptyText}>
              {filter === 'unread' 
                ? 'No unread alerts at the moment.'
                : filter === 'critical'
                ? 'No critical alerts at the moment.'
                : 'No alerts available at the moment.'
              }
            </Text>
          </View>
        }
      />
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
    flex: 1,
    textAlign: 'center',
  },
  markReadButton: {
    backgroundColor: AppColors.textAccent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  markReadButtonText: {
    color: AppColors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: AppColors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.lightGrey,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: AppColors.lightGrey,
  },
  activeFilterButton: {
    backgroundColor: AppColors.primaryBackground,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.darkTeal,
  },
  activeFilterButtonText: {
    color: AppColors.textPrimary,
  },
  listContainer: {
    padding: 20,
  },
  alertItem: {
    backgroundColor: AppColors.textPrimary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: AppColors.textAccent,
  },
  alertHeader: {
    flexDirection: 'row',
  },
  alertIconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  alertIcon: {
    fontSize: 24,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.textAccent,
  },
  alertContent: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.darkTeal,
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    color: AppColors.textPrimary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 14,
    color: AppColors.darkTeal,
    lineHeight: 20,
    marginBottom: 8,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertLocation: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontStyle: 'italic',
    flex: 1,
  },
  alertTimestamp: {
    fontSize: 12,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.darkTeal,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
