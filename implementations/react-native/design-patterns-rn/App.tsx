import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppNav } from './src/app/navigation/navigation';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNav />
    </SafeAreaView>
  );
}