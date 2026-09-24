import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

export type RootStackParamList = {
  Home: undefined
  addProduct: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View>
      <Text>Nuevo proyecto</Text>
    </View>
  );
}

