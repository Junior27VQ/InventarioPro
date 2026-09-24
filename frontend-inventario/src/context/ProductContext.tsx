import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Alert } from "react-native";
import { api } from "../api";

export type Product = {
  id?: number;
  nombre: string;
  precio: number;
  categoria: string;
  fotoBase64: string;
  createdAt?: string;
};

type ProductContextType = {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Omit<Product, 'id' | 'createdAt'>) => Promise<boolean>;
  updateProduct: (id: number, product: Omit<Product, 'id' | 'createdAt'>) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<void>;
};

const ProductContext = createContext<ProductContextType>({} as ProductContextType);

export function ProductoProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/productos');
      setProducts(response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor local");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const response = await api.post('/productos', newProduct);
      setProducts([...products, response.data]);
      return true;
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el producto");
      return false;
    }
  };

  const updateProduct = async (id: number, product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const response = await api.put(`/productos/${id}`, product);
      setProducts(products.map(p => p.id === id ? response.data : p));
      return true;
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el producto");
      return false;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/productos/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el producto");
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Debe usarse dentro de un ProductoProvider.");
  }
  return context;
}