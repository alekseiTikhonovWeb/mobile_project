import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../contexts/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Success', 'Product added to cart');
  };

  return (
    <LinearGradient colors={['#6bd7efff', '#70e97aff']} style={styles.background}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 16 }} style={{ width: '100%' }}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>← Back</Text>
          </TouchableOpacity>
          <Image 
            source={{ uri: product.imageUrl || 'https://via.placeholder.com/300' }} 
            style={styles.productImage} 
          />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 32
  },
  backLink: {
    color: '#2563eb',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start'
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover'
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 8
  },
  productDescription: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    height: 46,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ProductDetailScreen;
