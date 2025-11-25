import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AddressSelectionScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, 'addresses'), where('userId', '==', uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const addrList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAddresses(addrList);
      if (addrList.length > 0) {
        setSelectedAddressId(addrList[0].id); 
      }
    });
    return unsubscribe;
  }, []);

  const handleNext = () => {
    if (!selectedAddressId) return;
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    navigation.navigate('PaymentSelection', { 
      address: selectedAddress ? selectedAddress.address : '' 
    });
  };

  return (
    <LinearGradient colors={['#6bd7efff', '#70e97aff']} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Back to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select Delivery Address</Text>
        {addresses.length === 0 ? (
          <Text style={styles.noAddressText}>
            No saved addresses found. Please add an address in your profile.
          </Text>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.addressItem} 
                onPress={() => setSelectedAddressId(item.id)}
              >
                <Text style={styles.addressRadio}>
                  {selectedAddressId === item.id ? '◉' : '○'}
                </Text>
                <Text style={styles.addressText}>{item.address}</Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
        )}
        <TouchableOpacity 
          style={[styles.button, addresses.length === 0 && styles.buttonDisabled]} 
          onPress={handleNext} 
          disabled={addresses.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 16,
    width: '100%'
  },
  backLink: {
    color: '#2563eb',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111827'
  },
  noAddressText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginVertical: 20
  },
  addressItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  addressRadio: {
    fontSize: 20,
    color: '#2563eb',
    marginRight: 8
  },
  addressText: {
    fontSize: 16,
    color: '#111827'
  },
  button: {
    marginTop: 16,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  list: {}
});

export default AddressSelectionScreen;
