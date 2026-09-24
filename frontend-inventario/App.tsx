import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ProductoProvider } from './src/context/ProductContext';
import ProductsScreen from './src/screens/ProductsScreen';
import AddProductScreen from './src/screens/AddProductScreen';

export type RootStackParamList = {
  ListProducts: undefined;
  AddProduct: { id?: string | number }; 
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <ProductoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';

              if (route.name === 'ListProducts') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'AddProduct') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="ListProducts" 
            component={ProductsScreen} 
            options={{ title: 'Listado de Productos' }}
          />
          <Tab.Screen 
            name="AddProduct" 
            component={AddProductScreen} 
            options={{ title: 'Agregar Producto' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ProductoProvider>
  );
}