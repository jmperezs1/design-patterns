import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNav } from './src/app/navigation/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNav />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}