/**
 * Samudra Sachet - Coastal Guardian App Color Palette
 * Based on the provided UI mockups and design requirements
 */

import { Platform } from 'react-native';

// Primary Color Palette from UI Mockups
export const AppColors = {
  // Primary Background (from login/register screens)
  primaryBackground: '#2D607E',
  
  // Input Field Background
  inputBackground: '#7AB3C0',
  
  // Button Primary (Sign In/Sign Up)
  buttonPrimary: '#2A363B',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textAccent: '#4E89B5',
  
  // SOS Button
  sosButton: '#E57373',
  
  // Additional Palette Colors (from Frame 2)
  secondaryBlue: '#6FA8DC',
  darkTeal: '#0A5063',
  lightGrey: '#A2B7BF',
  lightPink: '#F0B2BA',
  brown: '#7F5E3D',
  cream: '#F2E9D8',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Status Indicators
  pendingSync: '#4E89B5',
  synced: '#4CAF50',
  underReview: '#FF9800',
  verified: '#2E7D32',
};

// Legacy Colors for compatibility
const tintColorLight = AppColors.textAccent;
const tintColorDark = AppColors.textPrimary;

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
