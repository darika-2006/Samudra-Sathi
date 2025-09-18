// MyReportsScreen.js

// IMPORTANT: Replace 'YOUR_COMPUTER_IP' in the fetch URL below
// with your actual local network IP address (e.g., 192.168.1.5).

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { AppColors } from '@/constants/theme'; // Assuming your colors are in this path

// Helper functions for styling
const getStatusColor = (status = '') => {
  switch (status.toLowerCase()) {
    case 'synced':
    case 'verified':
      return AppColors.verified;
    case 'pending sync':
    case 'pending':
      return AppColors.pendingSync;
    case 'under review':
      return AppColors.underReview;
    default:
      return AppColors.textSecondary;
  }
};

const getSeverityColor = (severity = '') => {
    switch (severity.toLowerCase()) {
      case 'low':
        return AppColors.success;
      case 'medium':
        return AppColors.warning;
      case 'high':
        return AppColors.error;
      case 'critical':
        return '#8B0000';
      default:
        return AppColors.textSecondary;
    }
  };

export default function MyReportsScreen() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://192.168.14.50:3001/api/reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        Alert.alert("Error", "Could not fetch reports from the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatTimestamp = (timestamp: string | number | Date) => {
    if (!timestamp) return 'No date provided';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const renderReportItem = ({ item }) => (
    <TouchableOpacity style={styles.reportItem}>
      <View style={styles.reportHeader}>
        <View style={styles.incidentInfo}>
          <Text style={styles.incidentIcon}>🔔</Text>
          <View style={styles.incidentDetails}>
            <Text style={styles.incidentType}>{item.incident_type || 'No Type'}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(item.created_at)}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status || 'Unknown'}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description || 'No description.'}</Text>
      <View style={styles.reportFooter}>
        {item.severity_level && (
            <View style={styles.severityContainer}>
            <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(item.severity_level) }]} />
            <Text style={styles.severityText}>{item.severity_level}</Text>
            </View>
        )}
        {item.location && <Text style={styles.locationText}>{item.location}</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={AppColors.darkTeal} />
        <Text style={{ marginTop: 10, color: AppColors.textSecondary }}>Loading Reports...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Reports</Text>
      </View>
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No Reports Yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.cream || '#F2E9D8' },
  centered: { alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: AppColors.primaryBackground || '#0A5063',
  },
  headerTitle: {
    color: AppColors.textPrimary || '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: { padding: 20 },
  reportItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  incidentInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  incidentIcon: { fontSize: 24, marginRight: 12 },
  incidentDetails: { flex: 1 },
  incidentType: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.darkTeal || '#0A5063',
  },
  timestamp: { fontSize: 12, color: AppColors.textSecondary || '#666' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: AppColors.darkTeal || '#0A5063',
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  severityContainer: { flexDirection: 'row', alignItems: 'center' },
  severityIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.darkTeal || '#0A5063',
  },
  locationText: {
    fontSize: 11,
    color: AppColors.textSecondary || '#666',
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.darkTeal || '#0A5063',
  },
});