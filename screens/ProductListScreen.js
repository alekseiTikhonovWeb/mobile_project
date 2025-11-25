import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const localImages = {
  teddy: require('../assets/products/bear.png'),
  blocks: require('../assets/products/blocks.png'),
  doll: require('../assets/products/doll.png'),
  bunny: require('../assets/products/bunny.png'),
  sorter: require('../assets/products/sorter.png'),
  fashion: require('../assets/products/fashion.png'),
  panda: require('../assets/products/panda.png'),
  puzzle: require('../assets/products/puzzle.png'),
  handmade: require('../assets/products/handmade.png'),
  family: require('../assets/products/family.png'),
};

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ['All', 'Plush Toys', 'Educational Toys', 'Dolls'];

  useEffect(() => {
    const mockProducts = [
      {
        id: '1',
        name: 'Teddy Bear',
        description: 'Soft plush teddy bear, perfect for kids.',
        price: 14.99,
        category: 'Plush Toys',
        image: localImages.teddy
      },
      {
        id: '2',
        name: 'Alphabet Blocks',
        description: 'Blocks with colorful letters for learning.',
        price: 9.99,
        category: 'Educational Toys',
        image: localImages.blocks
      },
      {
        id: '3',
        name: 'Doll',
        description: 'Beautiful  doll with accessories.',
        price: 19.99,
        category: 'Dolls',
        image: localImages.doll
      },
      {
        id: '4',
        name: 'Stuffed Bunny',
        description: 'Fluffy stuffed bunny with long ears.',
        price: 12.49,
        category: 'Plush Toys',
        image: localImages.bunny
      },
      {
        id: '5',
        name: 'Shape Sorter',
        description: 'Educational shape sorter for toddlers.',
        price: 11.99,
        category: 'Educational Toys',
        image: localImages.sorter
      },
      {
        id: '6',
        name: 'Baby Doll',
        description: 'Baby doll in beautiful fashion outfit.',
        price: 22.99,
        category: 'Dolls',
        image: localImages.fashion
      },
      {
        id: '7',
        name: 'Panda Plush',
        description: 'Cute panda bear plushie for cuddles.',
        price: 13.99,
        category: 'Plush Toys',
        image: localImages.panda
      },
      {
        id: '8',
        name: 'Number Puzzle',
        description: 'Wooden puzzle to learn counting and numbers.',
        price: 8.75,
        category: 'Educational Toys',
        image: localImages.puzzle
      },
      {
        id: '9',
        name: 'Handmade Doll',
        description: 'Colorful handmade Doll.',
        price: 18.50,
        category: 'Dolls',
        image: localImages.handmade
      },
      {
        id: '10',
        name: 'Bear Family Set',
        description: 'Miniature bear plush family, set of 4.',
        price: 17.25,
        category: 'Plush Toys',
        image: localImages.family
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let data = products;
    if (selectedCategory !== 'All') {
      data = data.filter(product => product.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      const queryLower = searchQuery.toLowerCase();
      data = data.filter(product => 
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower)
      );
    }
    setFilteredProducts(data);
  }, [products, selectedCategory, searchQuery]);

  return (
    <LinearGradient colors={['#6bd7efff', '#70e97aff']} style={styles.background}>
      <View style={styles.container}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity 
              key={category} 
              style={[
                styles.categoryButton, 
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryButtonText, 
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList 
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.productList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.productCard} 
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
              <Image 
                source={item.image} 
                style={styles.productImage} 
              />
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
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
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#111827',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
    marginBottom: 8
  },
  categoryButtonActive: {
    backgroundColor: '#2563eb'
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827'
  },
  categoryButtonTextActive: {
    color: '#ffffff'
  },
  productList: {
    flex: 1
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 8,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  productImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover'
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb'
  }
});

export default ProductListScreen;
