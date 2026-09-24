import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useProduct } from '../context/ProductContext';

export default function ProductosScreen({ navigation }: any) {
  const { products, deleteProduct } = useProduct();

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => item.id && navigation.navigate('AddProduct', { id: item.id })}
          >
            {item.fotoBase64 ? (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${item.fotoBase64}` }} 
                style={styles.productImage}
              />
            ) : (
              <View style={styles.noImageView}>
                <MaterialCommunityIcons name="image-off-outline" size={24} color="#888" />
                <Text style={styles.noImageText}>Sin imagen</Text>
              </View>
            )}

            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.nombre}</Text>
              <Text style={styles.productCategory}>{item.categoria}</Text>
              <Text style={styles.productPrice}>$ {item.precio.toFixed(2)}</Text>
            </View>

            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => item.id && deleteProduct(item.id)}
            >
              <Ionicons name="trash-outline" size={22} color="#ff5252" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e1e4e8',
  },
  noImageView: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});