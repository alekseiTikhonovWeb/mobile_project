import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../contexts/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }} 
        style={styles.cartItemImage} 
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.cartItemActions}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => {
              if (item.quantity > 1) {
                updateQuantity(item.id, item.quantity - 1);
              } else {
                removeFromCart(item.id);
              }
            }}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#6bd7efff', '#70e97aff']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Shopping Cart</Text>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        ) : (
          <>
            <FlatList 
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
            />
            <View style={styles.summaryContainer}>
              <Text style={styles.subtotalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
              <TouchableOpacity 
                style={styles.checkoutButton} 
                onPress={() => navigation.navigate('AddressSelection')}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111827'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280'
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: 'cover'
  },
  cartItemDetails: {
    flex: 1
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 8
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#111827'
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 20,
    textAlign: 'center'
  },
  removeButton: {
    marginLeft: 16
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626'
  },
  summaryContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    width: '100%'
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827'
  },
  checkoutButton: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  list: {}
});

export default CartScreen;
