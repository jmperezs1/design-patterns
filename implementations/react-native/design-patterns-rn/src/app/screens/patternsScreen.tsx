import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { patterns } from '../../registry/patterns';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Pattern: { id: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Pattern'>;

export const PatternScreen: React.FC<Props> = ({ route }) => {
  const entry = patterns.find((p) => p.id === route.params.id);
  if (!entry) return <Text style={{ padding: 16 }}>Pattern not found</Text>;
  const Demo = entry.Component;

  return (
    <ScrollView contentContainerStyle={styles.body}>
      {!!entry.markdown && (
        <View style={styles.card}>
          <Text style={styles.h2}>{entry.name}</Text>
          <Text style={{ color: '#555' }}>{entry.markdown}</Text>
        </View>
      )}
      <View style={styles.card}>
        <Demo />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: { padding: 16, gap: 12 },
  card: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
});
