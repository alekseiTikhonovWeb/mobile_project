import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OrderConfirmationScreen = ({ route }) => {
  const { address, paymentMethod, total } = route.params;
  return (
    <LinearGradient colors={['#6bd7efff', '#70e97aff']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.confirmationText}>Thank you for your purchase.</Text>
        <Text style={styles.confirmationText}>
          Your order will be delivered to: {address}.
        </Text>
        <Text style={styles.confirmationText}>
          Payment Method: {paymentMethod}.
        </Text>
        <Text style={styles.confirmationText}>
          Total Paid: ${total.toFixed(2)}
        </Text>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16
  },
  confirmationText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8
  }
});

export default OrderConfirmationScreen;
