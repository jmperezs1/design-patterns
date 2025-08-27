import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PatternScreen } from '../screens/patternsScreen';


export type RootStackParamList = {
  Home: undefined;
  Pattern: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNav: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Design Patterns' }} />
      <Stack.Screen name="Pattern" component={PatternScreen} options={({ route }) => ({ title: route.params.id })} />
    </Stack.Navigator>
  </NavigationContainer>
);
