// screens/OrderHistoryScreen.js
// Shows list of previous orders for the logged-in user (from Firestore).

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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
} from 'firebase/firestore';

export default function OrdrHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  // Listen for orders of current user in Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert Firestore Timestamp to JS Date if needed
        let orderDate = null;
        if (data.orderDate?.toDate) {
          orderDate = data.orderDate.toDate();
        } else if (typeof data.orderDate === 'string') {
          orderDate = new Date(data.orderDate);
        }

        return {
          id: doc.id,
          ...data,
          orderDate,
        };
      });

      // Sort newest first on client
      list.sort((a, b) => (b.orderDate?.getTime() || 0) - (a.orderDate?.getTime() || 0));
      setOrders(list);
    });

    return unsubscribe;
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

 
  return (
    <View style={styles.screen}>
      {/* Header with gradient */}
      <LinearGradient
        colors={['#6bd7efff', '#70e97aff']}
        style={styles.headerGradient}
      >

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order History</Text>
          <View style={{ width: 24 }} />
        </View>

      </LinearGradient>

      {/* Order list */}
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map((order) => (
          <View key={order.id} style={styles.card}>
            {/* Top row: order number + status pill */}
            <View style={styles.topRow}>
              <View>
                <Text style={styles.orderId}>Order #{order.orderNumber || order.id}</Text>
                {order.orderDate && (
                  <Text style={styles.orderDate}>{formatDate(order.orderDate)}</Text>
                )}
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{order.status || 'PLACED'}</Text>
              </View>
            </View>

            {/* Items (simple text list) */}
            <View style={styles.itemsSection}>
              {(order.items || []).map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                </View>
              ))}
            </View>

            {/* Total + Track Order button */}
            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>
                  ${order.total ? order.total.toFixed(2) : '0.00'}
                </Text>
              </View>
              <TouchableOpacity style={styles.trackButton} 
                onPress={() => Alert.alert('Coming Soon', 'Order tracking is coming soon!')}>
                <Text style={styles.trackButtonText}>Track Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {orders.length === 0 && (
          <Text style={styles.emptyText}>
            You have no previous orders yet.
          </Text>
        )}
      </ScrollView>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  orderDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  itemsSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 13,
    color: '#111827',
  },
  itemQty: {
    fontSize: 13,
    color: '#6b7280',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  trackButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#2563eb',
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
});
