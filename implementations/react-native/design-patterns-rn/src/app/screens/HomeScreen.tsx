import React, { useMemo, useState } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { patterns, groupByCategory } from '../../registry/patterns';
import { SearchInput } from '../../components/SearchInput';
import { PatternCard } from '../../components/PatternCard';
import { CATEGORY_ORDER } from '../../registry/categories';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Pattern: { id: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [q, setQ] = useState('');

  const sections = useMemo(() => {
    const filtered = patterns.filter((p) => {
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s) || p.id.toLowerCase().includes(s);
    });
    const grouped = groupByCategory(filtered);
    const orderIndex = (cat: string) => CATEGORY_ORDER.indexOf(cat as any);
    grouped.sort((a, b) => orderIndex(a.category) - orderIndex(b.category));
    return grouped.map((g) => ({ title: g.category, data: g.data }));
  }, [q]);

  return (
    <View style={styles.screen}>
      <Text style={styles.h1}>Design Patterns</Text>
      <SearchInput value={q} onChangeText={setQ} placeholder="Buscar patrones…" />
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => <Text style={styles.section}>{section.title}</Text>}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <PatternCard
              title={item.name}
              subtitle={item.id}
              onPress={() => navigation.navigate('Pattern', { id: item.id })}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#666', marginTop: 24 }}>No patterns found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 22, fontWeight: '700' },
  section: { marginTop: 12, marginBottom: 8, fontWeight: '700' },
});
