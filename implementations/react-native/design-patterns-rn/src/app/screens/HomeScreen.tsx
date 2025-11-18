import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { patterns, groupByCategory } from '../../registry/patterns';
import { SearchInput } from '../../components/SearchInput';
import { PatternCard } from '../../components/PatternCard';
import { CATEGORY_ORDER, CATEGORY_ICONS } from '../../registry/categories';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = { Home: undefined; Pattern: { id: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
    // ScrollView para permitir desplazamiento cuando múltiples categorías están expandidas.
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator>
      <Text style={styles.h1}>Design Patterns</Text>
      <SearchInput value={q} onChangeText={setQ} placeholder="Buscar patrones…" />
      {sections.map((section) => (
        <View key={section.title}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() =>
              setExpanded((prev) => ({
                ...prev,
                [section.title]: !prev[section.title],
              }))
            }
          >
            <Icon
              name={CATEGORY_ICONS[section.title as keyof typeof CATEGORY_ICONS]}
              size={20}
              color="#555"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.section}>{section.title}</Text>
            <Icon
              name={expanded[section.title] ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#555"
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>
          {expanded[section.title] &&
            section.data.map((item) => (
              <View key={item.id} style={{ marginBottom: 8 }}>
                <PatternCard
                  title={item.name}
                  subtitle={item.id}
                  onPress={() => navigation.navigate('Pattern', { id: item.id })}
                />
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Usado como contentContainerStyle del ScrollView: no requiere flex:1.
  screen: { padding: 16, gap: 12 },
  h1: { fontSize: 22, fontWeight: '700' },
  section: { marginTop: 12, marginBottom: 8, fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 4,
  },
});
