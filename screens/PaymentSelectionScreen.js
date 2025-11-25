import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../contexts/CartContext';
import { auth, db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

const PaymentSelectionScreen = ({ navigation, route }) => {
  const { address } = route.params;
  const { cartItems, clearCart } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState('Credit Card');
  const paymentOptions = ['Credit Card', 'PayPal', 'Cash on Delivery'];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: auth.currentUser ? auth.currentUser.uid : null,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total,
        address: address,
        paymentMethod: selectedMethod,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      navigation.replace('OrderConfirmation', {
        address: address,
        paymentMethod: selectedMethod,
        total: total
      });
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#6bd7efff', '#70e97aff']} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Back to Address</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select Payment Method</Text>
        <Text style={styles.summaryText}>Deliver to: {address}</Text>
        <Text style={styles.summaryText}>Order Total: ${total.toFixed(2)}</Text>
        {paymentOptions.map(method => (
          <TouchableOpacity 
            key={method} 
            style={styles.methodItem} 
            onPress={() => setSelectedMethod(method)}
          >
            <Text style={styles.methodRadio}>
              {selectedMethod === method ? '◉' : '○'}
            </Text>
            <Text style={styles.methodText}>{method}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
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
  summaryText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 12
  },
  methodItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  methodRadio: {
    fontSize: 20,
    color: '#2563eb',
    marginRight: 8
  },
  methodText: {
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
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default PaymentSelectionScreen;
