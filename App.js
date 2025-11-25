import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import AddressSelectionScreen from './screens/AddressSelectionScreen';
import PaymentSelectionScreen from './screens/PaymentSelectionScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import { CartProvider } from './contexts/CartContext';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();

function ProductStackScreens() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductList" component={ProductListScreen} />
      <ProductStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </ProductStack.Navigator>
  );
}


function CartStackScreens() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="AddressSelection" component={AddressSelectionScreen} />
      <CartStack.Screen name="PaymentSelection" component={PaymentSelectionScreen} />
      <CartStack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </CartStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ProductsTab" component={ProductStackScreens} options={{ title: 'Products' }} />
      <Tab.Screen name="CartTab" component={CartStackScreens} options={{ title: 'Cart' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        {user ? (
          <MainTabs />
        ) : (
          <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </CartProvider>
  );
}
