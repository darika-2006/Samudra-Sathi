import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, AppColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1e3a8a', // Navy blue for active icons
        tabBarInactiveTintColor: '#474747',
        tabBarStyle: {
          backgroundColor: AppColors.textPrimary,
          borderTopColor: AppColors.lightGrey,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={focused ? '#474747' : AppColors.lightGrey} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-reports"
        options={{
          title: 'My Reports',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="book" 
              color={focused ? '#474747' : AppColors.lightGrey} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="bell.badge.fill" 
              color={focused ? '#474747' : AppColors.lightGrey} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name="gearshape.2.fill" 
              color={focused ? '#474747' : AppColors.lightGrey} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
