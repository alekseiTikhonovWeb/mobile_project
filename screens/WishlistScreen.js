import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import heart from '../assets/heart.png';

export default function WishlistScreen({ navigation }) {
  
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
          <Text style={styles.headerTitle}>My Wishlist</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>

          <View style={styles.heartPlaceholder}>
            <Image source={heart} style={styles.heart} />
          </View>

          <Text style={styles.title}>Your Wishlist is Empty</Text>
          <Text style={styles.subtitle}>
            Save items you love by tapping the heart icon on any product
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProductsTab')}
          >
            <Text style={styles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heartPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    marginBottom: 24,
  },
  heart:{
    width: '100%',
    height: '100%',
    borderRadius: 36,

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
