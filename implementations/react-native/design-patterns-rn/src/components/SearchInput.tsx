import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const SearchInput: React.FC<{ value: string; onChangeText: (v: string) => void; placeholder?: string }> = (p) => (
  <TextInput
    value={p.value}
    onChangeText={p.onChangeText}
    placeholder={p.placeholder ?? 'Search…'}
    style={styles.input}
  />
);

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
});
