import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

export interface ButtonProps { label: string; onPress?: () => void }
export interface BadgeProps { text: string }

export interface UIFactory {
  Button: React.FC<ButtonProps>;
  Badge: React.FC<BadgeProps>;
}

export const MaterialFactory: UIFactory = {
  Button: ({ label, onPress }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.mBtn, pressed && { opacity: .9 }]}>
      <Text style={styles.mBtnLabel}>{label}</Text>
    </Pressable>
  ),
  Badge: ({ text }) => (
    <View style={styles.mBadge}><Text style={{ color: '#155' }}>{text}</Text></View>
  ),
};

export const MinimalFactory: UIFactory = {
  Button: ({ label, onPress }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.sBtn, pressed && { opacity: .9 }]}>
      <Text style={styles.sBtnLabel}>{label}</Text>
    </Pressable>
  ),
  Badge: ({ text }) => (
    <View style={styles.sBadge}><Text style={{ color: '#333' }}>{text}</Text></View>
  ),
};

const styles = StyleSheet.create({
  mBtn: { backgroundColor: '#0ea5e9', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  mBtnLabel: { color: 'white', fontWeight: '700' },
  mBadge: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
  sBtn: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  sBtnLabel: { color: '#111', fontWeight: '600' },
  sBadge: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
});
