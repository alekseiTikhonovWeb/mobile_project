import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebase';

export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;
  const name = user?.name || 'User';
  const email = user?.email || '';

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#6bd7efff', '#70e97aff']}
        style={styles.headerGradient}
      >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.profileContainer}>
            <View style={styles.avatar} />
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
      </LinearGradient>

      {/* Orders, Wishlist, Reviews numbers */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.menuCard}>
        {/* My Orders */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate('OrdrHistory')}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="receipt-outline"
              size={20}
              color="#2563eb"
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>My Orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Wishlist */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="heart-outline"
              size={20}
              color="#2563eb"
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Wishlist</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Addresses */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate('Addresses')}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#2563eb"
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Addresses</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Payment Methods */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="card-outline"
              size={20}
              color="#2563eb"
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Payment Methods</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => (Alert.alert('Coming Soon', 'Notification settings coming soon!'))}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color="#2563eb"
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Support */}
        <TouchableOpacity
          style={styles.menuRow}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <View style={styles.menuLeft}>
            <Ionicons
              name="help-circle-outline"
              size={20}
              color="#2563eb"
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>Help &amp; Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerGradient: {
    paddingBottom: 24,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#4e4f4eff',
    marginTop: 2,
  },
  statsContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  menuCard: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginHorizontal: 8,
  },
  menuLabel: {
    fontSize: 14,
    color: '#111827',
  },
});
