import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { AppColors } from '@/constants/theme';

interface DashboardCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function DashboardCard({ icon, title, subtitle, onPress }: DashboardCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.cream,
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  icon: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.darkTeal,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
});
