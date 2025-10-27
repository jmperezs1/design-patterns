import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import pokemonAPI from './singleton';

type Pokemon = {
  name: string; id: number; height: number; weight: number; base_experience: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
  moves: { move: { name: string }; version_group_details: { level_learned_at: number }[] }[];
  sprites: { front_default: string | null };
};

export const SingletonDemo: React.FC = () => {
  const [query, setQuery] = useState('pikachu');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Pokemon | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true); setError(null);
      const json = await pokemonAPI.getPokemonData(query);
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally { setLoading(false); }
  };

  const sprite = useMemo(() => data?.sprites.front_default ?? undefined, [data]);
  return (
    <ScrollView contentContainerStyle={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput style={styles.input} value={query} onChangeText={setQuery} placeholder="Buscar Pokémon" />
        <Pressable style={styles.btn} onPress={fetchData}><Text>Buscar</Text></Pressable>
      </View>
      {loading && <Text>Cargando…</Text>}
      {error && <Text style={{ color: '#b00020' }}>{error}</Text>}
      {data && (
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            {!!sprite && <Image source={{ uri: sprite }} style={{ width: 96, height: 96 }} />}
            <View>
              <Text style={{ fontSize: 20, fontWeight: '700', textTransform: 'capitalize' }}>{data.name}</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                {data.types.map((t, i) => (
                  <Text key={`${t.type.name}-${i}`} style={styles.typeChip}>{t.type.name}</Text>
                ))}
              </View>
              <Text style={{ color: '#666', marginTop: 2 }}>
                #{String(data.id).padStart(3,'0')} • Height: {data.height/10}m • Weight: {data.weight/10}kg
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            {data.stats.map((s) => (
              <View key={s.stat.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 }}>
                <Text style={{ width: 110, textTransform: 'capitalize' }}>{s.stat.name.replace('-', ' ')}</Text>
                <Text style={{ width: 40, fontVariant: ['tabular-nums'] }}>{s.base_stat}</Text>
                <View style={{ flex: 1, height: 8, backgroundColor: '#e5e7eb', borderRadius: 999 }}>
                  <View style={{ height: 8, width: `${Math.min(100, (s.base_stat/150)*100)}%`, backgroundColor: '#3b82f6', borderRadius: 999 }} />
                </View>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Recent Moves (First 10)</Text>
            {data.moves.slice(0,10).map((m, i) => (
              <View key={`${m.move.name}-${i}`} style={{ flexDirection: 'row', gap: 8, paddingVertical: 4 }}>
                <Text style={{ flex: 1, textTransform: 'capitalize' }}>{m.move.name.replace('-', ' ')}</Text>
                <Text style={{ width: 60, textAlign: 'right' }}>{m.version_group_details[0]?.level_learned_at ?? 'N/A'}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btn: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
  card: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  sectionTitle: { fontWeight: '700', marginBottom: 6 },
  typeChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: '#e5e7eb', textTransform: 'capitalize' },
});
