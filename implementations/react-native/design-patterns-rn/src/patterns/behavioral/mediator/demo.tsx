import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { ConcreteMediator } from './concrete-mediator';
import { SearchBox } from './concrete-colleague-a';
import { ResultsList } from './concrete-colleague-b';
import { CategoryFilter } from './concrete-colleague-c';
import { ClearButton } from './concrete-colleague-d';
import type { Item } from './types/type';

const SAMPLE: Item[] = [
  { id: '1', name: 'Clean Code', category: 'books' },
  { id: '2', name: 'Mechanical Keyboard', category: 'tech' },
  { id: '3', name: 'Coffee Mug', category: 'home' },
  { id: '4', name: 'TypeScript Handbook', category: 'books' },
  { id: '5', name: 'USB-C Cable', category: 'tech' },
];

export const MediatorDemo: React.FC = () => {
  const A = useMemo(() => new SearchBox(), []);
  const B = useMemo(() => new ResultsList(), []);
  const C = useMemo(() => new CategoryFilter(), []);
  const D = useMemo(() => new ClearButton(), []);
  const [logs, setLogs] = useState<string[]>([]);

  const mediator = useMemo(() => new ConcreteMediator(A, B, C, D, SAMPLE, (line) => setLogs((l) => [line, ...l])), []);
  // keep mediator referenced in RN render
  (mediator as any)["notify"]; 

  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'all' | Item['category']>('all');

  function onSearchChange(text: string) {
    setQ(text);
    A.operationA(text);
  }
  function onCategoryChange(newCat: 'all' | Item['category']) {
    setCat(newCat);
    C.operationC(newCat);
  }
  function onClear() { D.operationD(); setQ(''); setCat('all'); }

  return (
    <View style={styles.box}>
      <ScrollView>
        <Text style={styles.title}>Mediator: Buscador con Filtro</Text>
        <Text style={styles.subtitle}>Los componentes se comunican a través del Mediator.</Text>

        <View style={styles.row}>
          <TextInput value={q} onChangeText={onSearchChange} placeholder="Buscar..." style={styles.input} />
          <Pressable onPress={() => onCategoryChange('all')} style={styles.chip}><Text>All</Text></Pressable>
          <Pressable onPress={() => onCategoryChange('books')} style={styles.chip}><Text>Books</Text></Pressable>
          <Pressable onPress={() => onCategoryChange('tech')} style={styles.chip}><Text>Tech</Text></Pressable>
          <Pressable onPress={() => onCategoryChange('home')} style={styles.chip}><Text>Home</Text></Pressable>
          <Pressable onPress={onClear} style={[styles.chip, { backgroundColor: '#fee' }]}><Text>Clear</Text></Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resultados ({B.view.length})</Text>
          {B.view.map(it => (
            <Text key={it.id} style={{ marginTop: 6 }}>{it.name} <Text style={{ color: '#666' }}>· {it.category}</Text></Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Logs</Text>
          {logs.length ? logs.map((l, i) => <Text key={i} style={{ fontSize: 12 }}>{l}</Text>) : <Text style={{ color: '#666' }}>Sin eventos aún</Text>}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 4, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 999, backgroundColor: '#fafafa', marginLeft: 8 },
  card: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
});
