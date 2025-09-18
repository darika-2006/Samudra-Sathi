import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { AppColors } from '@/constants/theme';
import NetInfo from '@react-native-community/netinfo';

// Mock data for incident types
const incidentTypes = [
  { id: '1', name: 'Cyclone Warning', icon: '🌪️' },
  { id: '2', name: 'Tsunami Alert', icon: '🌊' },
  { id: '3', name: 'Flood Warning', icon: '🌧️' },
  { id: '4', name: 'Storm Surge', icon: '⚡' },
  { id: '5', name: 'High Winds', icon: '💨' },
  { id: '6', name: 'Heavy Rain', icon: '☔' },
  { id: '7', 'name': 'Other', icon: '⚠️' },
];

const severityLevels = [
  { id: '1', name: 'Low', color: AppColors.success },
  { id: '2', name: 'Medium', color: AppColors.warning },
  { id: '3', name: 'High', color: AppColors.error },
  { id: '4', name: 'Critical', color: '#8B0000' },
];

export default function ReportHazardScreen() {
  const { emergency } = useLocalSearchParams();
  const [isOnline, setIsOnline] = useState(true);
  const [selectedIncidentType, setSelectedIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('2');
  const [location, setLocation] = useState('Current Location: 12.9716° N, 77.5946° E');
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    // Check network connectivity
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });

    // If emergency mode, pre-select critical severity
    if (emergency === 'true') {
      setSelectedSeverity('4');
      setSelectedIncidentType('1'); // Cyclone Warning as default for emergency
    }

    return () => unsubscribe();
  }, [emergency]);

  const handleSubmitReport = () => {
    if (!selectedIncidentType || !description.trim()) {
      Alert.alert('Error', 'Please select incident type and provide description');
      return;
    }

    const report = {
      id: Date.now().toString(),
      incidentType: selectedIncidentType,
      description: description.trim(),
      severity: selectedSeverity,
      location,
      timestamp: new Date().toISOString(),
      status: isOnline ? 'pending' : 'offline',
      mediaFiles,
    };

    // TODO: Save to local storage and sync when online
    console.log('Report submitted:', report);
    
    Alert.alert(
      'Report Submitted',
      isOnline 
        ? 'Your report has been submitted successfully and is being reviewed.'
        : 'Your report has been saved locally and will be synced when you have internet connection.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleAddPhoto = () => {
    // TODO: Implement camera/gallery picker
    Alert.alert('Add Photo', 'Camera functionality will be implemented');
  };

  const handleAddVideo = () => {
    // TODO: Implement video recording
    Alert.alert('Add Video', 'Video recording functionality will be implemented');
  };

  const handleRecordVoice = () => {
    // TODO: Implement voice recording
    Alert.alert('Record Voice', 'Voice recording functionality will be implemented');
  };

  const renderIncidentType = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.incidentTypeItem,
        selectedIncidentType === item.id && styles.selectedIncidentType,
      ]}
      onPress={() => {
        setSelectedIncidentType(item.id);
        setShowIncidentModal(false);
      }}
    >
      <Text style={styles.incidentIcon}>{item.icon}</Text>
      <Text style={styles.incidentName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Hazard</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Offline Indicator */}
      {!isOnline && (
        <View style={styles.offlineIndicator}>
          <Text style={styles.offlineText}>📡 Offline - Saving Locally</Text>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Incident Type Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incident Type *</Text>
          <TouchableOpacity
            style={styles.incidentTypeSelector}
            onPress={() => setShowIncidentModal(true)}
          >
            <Text style={styles.incidentTypeText}>
              {selectedIncidentType 
                ? incidentTypes.find(type => type.id === selectedIncidentType)?.name
                : 'Select incident type'
              }
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description *</Text>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the incident in detail..."
            placeholderTextColor={AppColors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Media Capture Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Media (Optional)</Text>
          <View style={styles.mediaButtonsContainer}>
            <TouchableOpacity style={styles.mediaButton} onPress={handleAddPhoto}>
              <Text style={styles.mediaButtonIcon}>📷</Text>
              <Text style={styles.mediaButtonText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={handleAddVideo}>
              <Text style={styles.mediaButtonIcon}>🎥</Text>
              <Text style={styles.mediaButtonText}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={handleRecordVoice}>
              <Text style={styles.mediaButtonIcon}>🎤</Text>
              <Text style={styles.mediaButtonText}>Voice</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        {/* Severity Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severity Level</Text>
          <View style={styles.severityContainer}>
            {severityLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.severityButton,
                  selectedSeverity === level.id && styles.selectedSeverity,
                  { borderColor: level.color },
                ]}
                onPress={() => setSelectedSeverity(level.id)}
              >
                <View style={[styles.severityIndicator, { backgroundColor: level.color }]} />
                <Text style={styles.severityText}>{level.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
          <Text style={styles.submitButtonText}>
            {isOnline ? 'Submit Report' : 'Save Locally'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Incident Type Modal */}
      <Modal
        visible={showIncidentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowIncidentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Incident Type</Text>
              <TouchableOpacity onPress={() => setShowIncidentModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={incidentTypes}
              renderItem={renderIncidentType}
              keyExtractor={(item) => item.id}
              style={styles.incidentTypeList}
            />
          </View>
        </View>
      </Modal>
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
  offlineIndicator: {
    backgroundColor: AppColors.warning,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  offlineText: {
    color: AppColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.darkTeal,
    marginBottom: 10,
  },
  incidentTypeSelector: {
    backgroundColor: AppColors.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incidentTypeText: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  dropdownArrow: {
    fontSize: 12,
    color: AppColors.textSecondary,
  },
  descriptionInput: {
    backgroundColor: AppColors.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: AppColors.textPrimary,
    minHeight: 100,
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaButton: {
    backgroundColor: AppColors.secondaryBlue,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  mediaButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  mediaButtonText: {
    color: AppColors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    backgroundColor: AppColors.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  locationText: {
    fontSize: 14,
    color: AppColors.darkTeal,
    fontWeight: '500',
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.lightGrey,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSeverity: {
    borderColor: AppColors.primaryBackground,
    backgroundColor: AppColors.inputBackground,
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.darkTeal,
  },
  submitButton: {
    backgroundColor: AppColors.buttonPrimary,
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: AppColors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: AppColors.textPrimary,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.darkTeal,
  },
  modalCloseButton: {
    fontSize: 20,
    color: AppColors.textSecondary,
  },
  incidentTypeList: {
    maxHeight: 300,
  },
  incidentTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedIncidentType: {
    backgroundColor: AppColors.inputBackground,
  },
  incidentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  incidentName: {
    fontSize: 16,
    color: AppColors.darkTeal,
    fontWeight: '500',
  },
});
