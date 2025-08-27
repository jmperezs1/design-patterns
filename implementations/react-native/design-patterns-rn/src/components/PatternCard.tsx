import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const PatternCard: React.FC<{ title: string; subtitle?: string; onPress: () => void }> = ({ title, subtitle, onPress }) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    <Text style={{ fontSize: 18, color: '#999' }}>›</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontWeight: '600' },
  subtitle: { color: '#666' },
});
