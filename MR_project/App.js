import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [data, setData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizeOption, setSelectedSizeOption] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddToCart = () => {
    if (data && !cartItems.includes(data)) {
      setCartItems([...cartItems, data]);
      console.log('Product added to cart:', data.title);
    }
  };

  const handleSizeOptionPress = (label) => {
    setSelectedSizeOption(label);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headLine} />
      <TouchableOpacity style={styles.cartButton} onPress={() => console.log('View Cart')}>
        <Text style={styles.cartButtonText}>My Cart</Text>
      </TouchableOpacity>
      <View style={styles.leftContainer}>
        {data?.imageURL ? (
          <Image source={{ uri: data.imageURL }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.topContainer}>
          {data?.title && <Text style={styles.title}>{data.title}</Text>}
          <View style={styles.separator} />
          <View style={styles.spaceLine} />
        </View>

        {data?.price && <Text style={styles.price}>{data.price}</Text>}
        <View style={styles.separator} />
        <View style={styles.spaceLine} />

        {data?.description && (
          <Text style={styles.description}>Description: {data.description}</Text>
        )}

        <View style={styles.sizeOptionTextContainer}>
          <Text style={styles.sizeOptionText}>
            Size<Text style={styles.redStar}>* </Text> 
            {selectedSizeOption }
          </Text>
        </View>

        <View style={styles.sizeOptionsContainer}>
          {data?.sizeOptions &&
            data.sizeOptions.map((sizeOption) => (
              <TouchableOpacity
                key={sizeOption.id}
                style={[
                  styles.sizeOptionButton,
                  selectedSizeOption === sizeOption.label && styles.selectedSizeOptionButton,
                ]}
                onPress={() => handleSizeOptionPress(sizeOption.label)}
              >
                <Text
                  style={[
                    styles.sizeOptionButtonText,
                    selectedSizeOption === sizeOption.label && styles.selectedSizeOptionButtonText,
                  ]}
                >
                  {sizeOption.label}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    justifyContent: 'center',
  },
  headLine: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 30,
    width: '100%',
    backgroundColor: '#F6F6F7',
    zIndex: 1,
  },
  cartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    borderRadius: 8,
    zIndex: 2,
  },
  cartButtonText: {
    fontSize: 12,
    marginRight: 80,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center image horizontally
    marginTop: 100, // Move image down
  },
  rightContainer: {
    flex: 1,
    padding: 16,
    marginLeft: 25,
  },
  topContainer: {
    alignSelf: 'stretch', // Stretch title container to full width
  },
  image: {
    marginLeft: 150,
    width: 400,
    height: 585,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: 'lightgray',
  },
  title: {
    marginTop: 80,
    fontSize: 20,
  },
  description: {
    color: '#888888',
    fontSize: 13,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F6F6F7',
    marginVertical: 8,
  },
  spaceLine: {
    height: 8,
  },
  addToCartButton: {
    marginTop: 16,
    borderColor: 'black',
    borderWidth: 3,
    padding: 8,
    marginRight: 570,
  },
  addToCartButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  sizeOptionButton: {
    marginTop: 8,
    borderColor: '#F6F6F7',
    borderWidth: 2,
    padding: 8,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSizeOptionButton: {
    borderColor: 'black',
  },
  sizeOptionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888888',
  },
  selectedSizeOptionButtonText: {
    color: 'black',
  },
  sizeOptionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sizeOptionText: {
    fontSize: 16,
    marginLeft: 4,
  },
  redStar: {
    color: '#C90000',
  },
});

export default App;
