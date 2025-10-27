// src/screens/patterns/PatternScreen.tsx
import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { patterns } from '../../registry/patterns';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CodeBlock } from '../../components/code-block';

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

      {/* Diagramas opcionales (URIs) */}
      {!!entry.images && (
        <View style={styles.card}>
          <Text style={[styles.h2, { marginBottom: 8 }]}>Diagramas</Text>
          {!!entry.images?.general && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.legend}>Solución general</Text>
              <Image
                source={{ uri: entry.images!.general! }}
                style={styles.diagram}
                resizeMode="contain"
              />
            </View>
          )}
          {!!entry.images?.specific && (
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.legend}>Solución específica</Text>
              <Image
                source={{ uri: entry.images!.specific! }}
                style={styles.diagram}
                resizeMode="contain"
              />
            </View>
          )}
          {!!entry.images?.extras?.length && (
            <View>
              <Text style={styles.legend}>Otros</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {entry.images!.extras!.map((u, i) => (
                    <Image key={u + i} source={{ uri: u }} style={[styles.diagram, { width: 240 }]} resizeMode="contain" />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      )}

      {/* Demo en vivo */}
      <View style={styles.card}>
        <Demo />
      </View>

      {/* Código (varios snippets, como en Flutter) */}
      {(entry.codeSnippets ?? []).length > 0 && (
        <View style={styles.card}>
          <Text style={[styles.h2, { marginBottom: 8 }]}>Código de ejemplo</Text>
          {entry.codeSnippets!.map((snip, i) => (
            <CodeBlock
              key={`${snip.title}-${i}`}
              title={snip.title}
              code={snip.code}
              language={snip.language ?? 'typescript'}
              height={320}
              initialOpen={i === 0} // abre el primero
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: { padding: 16, gap: 12 },
  card: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  legend: { color: '#666', marginBottom: 6 },
  diagram: { height: 220, width: '100%', backgroundColor: '#fafafa', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
});
