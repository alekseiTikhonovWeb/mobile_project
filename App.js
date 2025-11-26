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
import OrdrHistoryScreen from './screens/OrdrHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddressesScreen from './screens/AddressesScreen';
import { CartProvider } from './contexts/CartContext';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Image } from 'react-native';
import profileIcon from './assets/user.png';
import CartIcon from './assets/shopping-cart.png';
import HomeIcon from './assets/home.png';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const Profile = createNativeStackNavigator();


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

function ProductStackScreens() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: true }}>
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

function ProfileScreens() {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="ProfileScreen" component={ProfileScreen} />
      <Profile.Screen name="OrdrHistory" component={OrdrHistoryScreen} />
      <Profile.Screen name="Addresses" component={AddressesScreen} />
    </Profile.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ProductsTab" component={ProductStackScreens} options={{ title: 'Products',tabBarIcon: () => ( <Image source={HomeIcon} style={{ width: 24, height: 24}} /> )}}/>
      <Tab.Screen name="CartTab" component={CartStackScreens} options={{ title: 'Cart',tabBarIcon: () => ( <Image source={CartIcon} style={{ width: 26, height: 26}} /> )}}/>
      <Tab.Screen name="ProfileTab" component={ProfileScreens} options={{ title: 'Profile' ,tabBarIcon: () => ( <Image source={profileIcon} style={{ width: 24, height: 24}} /> )}} />
    </Tab.Navigator>
  );
}
