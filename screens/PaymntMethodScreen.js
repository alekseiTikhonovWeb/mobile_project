// screens/PaymentMethodsScreen.js
// Shows user's payment methods from Firestore with a modal to add/edit dummy cards.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
  updateDoc,
} from 'firebase/firestore';

export default function PaymentMethodsScreen({ navigation }) {
  // Store all methods for current user
  const [methods, setMethods] = useState([]);

  // Modal + form state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [last4, setLast4] = useState('');
  const [expiry, setExpiry] = useState('');
  const [editingMethod, setEditingMethod] = useState(null); // null = add mode, object = edit

  // Load payment methods for current user from Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const methodsRef = collection(db, 'paymentMethods');
    const q = query(methodsRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setMethods(list);
    });

    return unsubscribe;
  }, []);

  // Reset modal form
  const resetForm = () => {
    setLabel('');
    setLast4('');
    setExpiry('');
    setEditingMethod(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalVisible(true);
  };

  const openEditModal = (method) => {
    setEditingMethod(method);
    setLabel(method.label || '');
    setLast4(method.last4 || '');
    setExpiry(method.expiry || '');
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Save new or updated payment method to Firestore
  const handleSave = async () => {
    if (!label || !last4 || !expiry) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'No logged-in user.');
      return;
    }

    try {
      const methodsRef = collection(db, 'paymentMethods');

      if (editingMethod) {
        // Update existing method
        const ref = doc(db, 'paymentMethods', editingMethod.id);
        await updateDoc(ref, {
          label,
          last4,
          expiry,
        });
      } else {
        // Add new method (dummy data, only last4 / expiry)
        await addDoc(methodsRef, {
          userId: user.uid,
          label,
          last4,
          expiry,
        });
      }

      resetForm();
      setIsModalVisible(false);
    } catch (error) {
      console.log('Error saving payment method', error);
      Alert.alert('Error', 'Could not save payment method.');
    }
  };

  // Delete method
  const handleDelete = async (methodId) => {
    try {
      await deleteDoc(doc(db, 'paymentMethods', methodId));
    } catch (error) {
      console.log('Error deleting payment method', error);
      Alert.alert('Error', 'Could not delete payment method.');
    }
  };

  // helper to show masked number
  const renderMaskedNumber = (last4Value) => {
    const digits = last4Value;
    return `•••• •••• •••• ${digits}`;
  };

  return (
    <View style={styles.screen}>
      {/* Header with gradient and + button */}
      <LinearGradient
        colors={['#6bd7efff', '#70e97aff']}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment Methods</Text>
            <TouchableOpacity onPress={openAddModal}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* List of saved methods */}
      <ScrollView contentContainerStyle={styles.content}>
        {methods.map((method) => (
          <View key={method.id} style={styles.card}>
            {/* Card top row with icon + label */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="card-outline" size={22} color="#2563eb" />
              </View>
              <Text style={styles.cardLabel}>{method.label || 'Card'}</Text>
            </View>

            {/* Masked card number */}
            <Text style={styles.numberText}>
              {renderMaskedNumber(method.last4)}
            </Text>

            {/* Extra info like on screenshot */}
            <Text style={styles.extraLine}>
              {method.label || 'My card'}
            </Text>
            <Text style={styles.extraLine}>
              Expires: {method.expiry || 'MM/YY'}
            </Text>

            {/* Actions row: edit / delete */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => openEditModal(method)}
              >
                <Ionicons name="pencil-outline" size={18} color="#4b5563" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDelete(method.id)}
              >
                <Ionicons name="trash-outline" size={18} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {methods.length === 0 && (
          <Text style={styles.emptyText}>
            You have no saved payment methods. Tap + to add one.
          </Text>
        )}
      </ScrollView>

      {/* Modal with simple form for Add/Edit */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Label (e.g. Personal Visa)"
                value={label}
                onChangeText={setLabel}
              />
              <TextInput
                style={styles.input}
                placeholder="Last 4 digits (e.g. 1234)"
                value={last4}
                onChangeText={setLast4}
                keyboardType="number-pad"
                maxLength={4}
              />
              <TextInput
                style={styles.input}
                placeholder="Expiry (MM/YY)"
                value={expiry}
                onChangeText={setExpiry}
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveText}>Save</Text>
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
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  numberText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: '#111827',
  },
  extraLine: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
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
  // modal
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
