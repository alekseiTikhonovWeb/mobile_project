import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../services/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export default function AddressesScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);

  // Modal state for the quick form
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load addresses from Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const addresses = collection(db, 'addresses');
    const q = query(addresses, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setAddresses(list);
    });

    return unsubscribe;
  }, []);

  const resetForm = () => {
    setLabel('');
    setStreet('');
    setCity('');
    setPostalCode('');
    setPhone('');
  };

  const openModal = () => {
    resetForm();
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Save a new address to Firestore
  const handleSaveAddress = async () => {
    if (!label || !street || !city || !postalCode || !phone) {
    Alert.alert('Missing Info', 'Please fill in all fields.');
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    Alert.alert('Error', 'No logged-in user.');
    return;
  }

  setIsSaving(true);

  try {
    const addressesRef = collection(db, 'addresses');
    const isFirstAddress = addresses.length === 0;

    await addDoc(addressesRef, {
      userId: user.uid,
      label,
      street,
      city,
      postalCode,
      phone,
      isDefault: isFirstAddress,
    });

    // close modal window
    resetForm();
    setIsModalVisible(false);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Could not save address.');
  } finally {
    setIsSaving(false);
  }
};

  // Set address as default
  const handleSetDefault = async (addressId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const addressesRef = collection(db, 'addresses');
      const q = query(addressesRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const updates = snapshot.docs.map((d) => {
        const ref = doc(db, 'addresses', d.id);
        const isDefault = d.id === addressId;
        return updateDoc(ref, { isDefault });
      });

      await Promise.all(updates);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not update default address');
    }
  };

  // Delete address
  const handleDelete = async (addressId) => {
    try {
      await deleteDoc(doc(db, 'addresses', addressId));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not delete address');
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient
        colors={['#6bd7efff', '#70e97aff']}
        style={styles.headerGradient}
      >

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Addresses</Text>
            <TouchableOpacity onPress={openModal}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

      </LinearGradient>

      {/* List of addresses */}
      <ScrollView contentContainerStyle={styles.content}>
        {addresses.map((addr) => (
          <View key={addr.id} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.name}>{addr.label}</Text>
              {addr.isDefault && (
                <View style={styles.defaultPill}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>

            <Text style={styles.line}>{addr.street}</Text>
            <Text style={styles.line}>{addr.city}</Text>
            <Text style={styles.line}>{addr.postalCode}</Text>
            <Text style={styles.line}>{addr.phone}</Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                onPress={() => handleSetDefault(addr.id)}
                style={styles.iconButton}
              >
                <Ionicons
                  name="home-outline"
                  size={18}
                  color={addr.isDefault ? '#2563eb' : '#6b7280'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(addr.id)}
                style={styles.iconButton}
              >
                <Ionicons name="trash-outline" size={18} color="#f81e1eff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {addresses.length === 0 && (
          <Text style={styles.emptyText}>
            You have no saved addresses yet.
          </Text>
        )}
      </ScrollView>

      {/* Modal form */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Address</Text>

              <TextInput
                style={styles.input}
                placeholder="Label (e.g. Home, Work)"
                value={label}
                onChangeText={setLabel}
              />
              <TextInput
                style={styles.input}
                placeholder="Street"
                value={street}
                onChangeText={setStreet}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
              <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={postalCode}
                onChangeText={setPostalCode}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                  disabled={isSaving}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveAddress}
                  disabled={isSaving}
                >
                  <Text style={styles.saveText}>
                    {isSaving ? 'Saving…' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  defaultPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  line: {
    fontSize: 13,
    color: '#4b5563',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 16,
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
    marginBottom: 10,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#2563eb',
  },
  cancelText: {
    color: '#111827',
    fontWeight: '500',
  },
  saveText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
