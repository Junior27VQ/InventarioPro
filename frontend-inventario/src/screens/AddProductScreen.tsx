import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useProduct } from '../context/ProductContext';

export default function AddProductScreen({ route, navigation }: any) {
  const { products, addProduct, updateProduct } = useProduct();

  // Obtenemos el ID que viene por los parámetros de navegación
  const productoId = route.params?.id;
  const isEditing = !!productoId;

  // Si estamos editando, buscamos el producto en la lista existente usando el ID
  const productoAEditar = isEditing ? products.find((p) => p.id === productoId) : null;

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoBase64, setFotoBase64] = useState<string | undefined>();

  // Si encontramos el producto, rellenamos los campos; si no, se limpian para un registro nuevo
  useEffect(() => {
    if (isEditing && productoAEditar) {
      setNombre(productoAEditar.nombre || '');
      setPrecio(productoAEditar.precio ? productoAEditar.precio.toString() : '');
      setCategoria(productoAEditar.categoria || '');
      setFotoBase64(productoAEditar.fotoBase64 || undefined);
    } else {
      setNombre('');
      setPrecio('');
      setCategoria('');
      setFotoBase64(undefined);
    }
  }, [productoId, productoAEditar]);

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert('Permiso denegado', 'Se necesitan permisos de la cámara para capturar la fotografía.');
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.3,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      setFotoBase64(result.assets[0].base64);
    }
  };

  const guardar = async () => {
    if (!nombre || !precio || !categoria) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos obligatorios.');
      return;
    }

    const precioNum = parseFloat(precio);
    if (isNaN(precioNum)) {
      Alert.alert('Error', 'El precio debe ser un valor numérico válido.');
      return;
    }

    let exito = false;

    if (isEditing && productoAEditar) {
      // Actualizar producto existente utilizando su ID
      exito = await updateProduct(productoAEditar.id || (productoAEditar as any)._id, {
        nombre,
        precio: precioNum,
        categoria,
        fotoBase64: fotoBase64 || '',
      });
    } else {
      // Crear nuevo producto
      exito = await addProduct({
        nombre,
        precio: precioNum,
        categoria,
        fotoBase64: fotoBase64 || '',
      });
    }

    if (exito) {
      Alert.alert('Éxito', isEditing ? 'Producto actualizado correctamente' : 'Producto registrado correctamente');
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="pricetag-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del producto"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={precio}
          onChangeText={setPrecio}
          placeholder="Precio (ej. 25.50)"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="folder-outline" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={categoria}
          onChangeText={setCategoria}
          placeholder="Categoría"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={tomarFoto}>
        <Ionicons name="camera-outline" size={24} color="#fff" />
        <Text style={styles.cameraButtonText}>Tomar Fotografía</Text>
      </TouchableOpacity>

      {fotoBase64 ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${fotoBase64}` }}
            style={styles.previewImage}
          />
          <Text style={styles.previewText}>Imagen cargada con éxito</Text>
        </View>
      ) : (
        <View style={styles.noPreviewContainer}>
          <MaterialCommunityIcons name="image-outline" size={32} color="#aaa" />
          <Text style={styles.noPreviewText}>Sin fotografía adjunta</Text>
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={guardar}>
        <Ionicons name="save-outline" size={20} color="#fff" style={styles.saveIcon} />
        <Text style={styles.saveButtonText}>{isEditing ? 'Actualizar Producto' : 'Guardar Producto'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  cameraButton: {
    flexDirection: 'row',
    backgroundColor: '#34c759',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  previewText: {
    fontSize: 12,
    color: '#34c759',
    marginTop: 6,
    fontWeight: '600',
  },
  noPreviewContainer: {
    height: 85,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  noPreviewText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});