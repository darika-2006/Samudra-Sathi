# Samudra Sachet (समुद्र सचेत) - Coastal Guardian

A React Native mobile application for coastal communities to report ocean hazards and receive critical alerts. Built with offline-first functionality to ensure reliability in disaster-prone coastal areas.

## Features

### 🔐 Authentication
- **Login Screen**: Clean, intuitive login interface with username/email and password
- **Register Screen**: User registration with email, password, and username
- **Secure Authentication**: Local storage with AsyncStorage for offline access

### 🏠 Home Screen
- **Clean Interface**: Minimalist design with Samudra Sathi branding
- **SOS Button**: Prominent red floating action button for emergency reports
- **Quick Access**: Direct navigation to critical functions

### 📝 Report Hazard
- **Incident Types**: Cyclone, Tsunami, Flood, Storm Surge, High Winds, Heavy Rain, and Other
- **Media Capture**: Photo, Video, and Voice note recording capabilities
- **Location Services**: Automatic GPS location tagging
- **Severity Levels**: Low, Medium, High, and Critical severity classification
- **Offline Support**: Reports saved locally when offline, synced when online

### 📋 My Reports
- **Report History**: View all submitted reports with status indicators
- **Status Tracking**: Pending Sync, Synced, Under Review, and Verified statuses
- **Detailed View**: Complete report information with timestamps and locations
- **Sync Management**: Manual sync for pending reports

### 🔔 Alerts & Notifications
- **Critical Alerts**: Emergency notifications for coastal hazards
- **Priority Levels**: Critical, High, Medium, and Low priority alerts
- **Filter Options**: All, Unread, and Critical alert filtering
- **Real-time Updates**: Timestamp-based alert management

### ⚙️ Settings
- **Account Management**: Profile and password settings
- **Notification Preferences**: Push notifications and email settings
- **Location & Privacy**: Location services and permission management
- **App Settings**: Language, theme, and offline mode configuration
- **Support**: Help, About, Privacy Policy, and Terms of Service

## Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with Stack and Tab navigation
- **State Management**: React Context API for authentication
- **Storage**: AsyncStorage for offline data persistence
- **UI Components**: Custom themed components with consistent design
- **Location Services**: React Native Geolocation Service
- **Media Capture**: React Native Image Picker and Audio Recorder
- **Network**: React Native NetInfo for connectivity monitoring

## Color Palette

The app uses a carefully designed color palette inspired by coastal themes:

- **Primary Background**: `#2D607E` (Dark Teal)
- **Input Background**: `#7AB3C0` (Light Blue)
- **Button Primary**: `#2A363B` (Dark Gray)
- **Text Primary**: `#FFFFFF` (White)
- **Text Accent**: `#4E89B5` (Blue)
- **SOS Button**: `#E57373` (Red)
- **Status Colors**: Success, Warning, Error, and Info variants

## Installation & Setup

1. **Prerequisites**:
   - Node.js (v16 or higher)
   - npm or yarn
   - Expo CLI
   - iOS Simulator or Android Emulator

2. **Installation**:
   ```bash
   cd Samudra_sathi
   npm install
   ```

3. **Run the App**:
   ```bash
   npm start
   # or
   expo start
   ```

4. **Platform-specific Commands**:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## Project Structure

```
Samudra_sathi/
├── app/
│   ├── (tabs)/           # Tab navigation screens
│   │   ├── index.tsx     # Home screen
│   │   ├── my-reports.tsx # My Reports screen
│   │   ├── alerts.tsx    # Alerts screen
│   │   └── settings.tsx  # Settings screen
│   ├── login.tsx         # Login screen
│   ├── register.tsx      # Register screen
│   ├── report-hazard.tsx # Report Hazard screen
│   ├── splash.tsx        # Splash screen
│   └── _layout.tsx       # Root layout
├── components/
│   ├── AuthGuard.tsx     # Authentication guard
│   └── ui/               # Reusable UI components
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── constants/
│   └── theme.ts          # App colors and themes
└── hooks/                # Custom React hooks
```

## Key Features Implementation

### Offline-First Architecture
- All reports are saved locally using AsyncStorage
- Network connectivity is monitored using NetInfo
- Automatic sync when connection is restored
- Clear offline indicators in the UI

### Accessibility
- High contrast color scheme for visibility
- Large touch targets for easy interaction
- Clear typography and iconography
- Support for different screen sizes

### Performance
- Optimized image loading and caching
- Efficient list rendering with FlatList
- Minimal re-renders with proper state management
- Fast navigation with Expo Router

## Future Enhancements

- [ ] Real-time backend integration
- [ ] Push notification system
- [ ] Map integration for location visualization
- [ ] Multi-language support
- [ ] Advanced media compression
- [ ] Offline map support
- [ ] Emergency contact integration
- [ ] Weather API integration

## Contributing

This is a prototype application for coastal hazard reporting. For production use, additional security measures, backend integration, and testing would be required.

## License

This project is developed for educational and demonstration purposes. Please ensure proper licensing for production use.

---

**Samudra Sachet** - Protecting coastal communities through technology and awareness.
