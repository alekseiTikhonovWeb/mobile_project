import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import StorePhoto from '../assets/348s.jpg';

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#6bd7efff', '#70e97aff']}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.header}>Toy Magic</Text>

          <Text style={styles.text}>
            We are "ToyMagic" - the biggest toy store on the planet. In our app,you
            can find and order toys for any age and taste. Our Toys mostly imported from Italy
            and have the highest quality. If you have any problems with you Toy, please let us know in
            Live chat,by Phone or by Email.
          </Text>

          <Image source={StorePhoto} style={{borderRadius:16,marginTop:30, alignSelf:'center', width:'100%'}}/>
        </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    alignSelf: 'center',
    marginBottom: 20
  },
  version: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
});
