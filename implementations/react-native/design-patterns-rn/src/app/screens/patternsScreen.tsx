// src/screens/patterns/PatternScreen.tsx
import React from 'react';
import { ScrollView, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { patterns } from '../../registry/patterns';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CodeBlock } from '../../components/code-block';
import { ZoomableImage } from '../../components/zoomable-image';

type RootStackParamList = { Home: undefined; Pattern: { id: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Pattern'>;

export const PatternScreen: React.FC<Props> = ({ route }) => {
  const entry = patterns.find((p) => p.id === route.params.id);
  if (!entry) return <Text style={{ padding: 16 }}>Pattern not found</Text>;
  const Demo = entry.Component;
  const { width } = useWindowDimensions();
  const twoCols = width > 720;

  return (
    <ScrollView contentContainerStyle={styles.body}>
      {/* Header */}
      <View style={[styles.headerCard, styles.card]}> 
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.h2, { flex: 1 }]}>{entry.name}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>{entry.category}</Text></View>
        </View>
        {!!(entry.resumen || entry.markdown) && (
          <Text style={{ color: '#444', marginTop: 6 }}>{entry.resumen || entry.markdown}</Text>
        )}
      </View>

      {/* Diagramas opcionales (URIs) */}
      {/* Problemática / Solución general */}
      {(entry.problematicaGeneral || entry.solucionGeneral || entry.images?.general) && (
        twoCols ? (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {!!entry.problematicaGeneral && (
              <View style={[styles.card, { flex: 1 }]}> 
                <Text style={styles.h2}>Problemática General</Text>
                <Text style={{ color: '#444' }}>{entry.problematicaGeneral}</Text>
              </View>
            )}
            <View style={[styles.card, { flex: 1 }]}> 
              <Text style={styles.h2}>Solución General</Text>
              {!!entry.solucionGeneral && (
                <Text style={{ color: '#444', marginBottom: 8 }}>{entry.solucionGeneral}</Text>
              )}
              {!!entry.images?.general && (
                <>
                  <ZoomableImage source={entry.images!.general!} style={styles.diagram} caption={`${entry.name} – General`} />
                  <Text style={styles.caption}>Diagrama de la solución general</Text>
                </>
              )}
            </View>
          </View>
        ) : (
          <>
            {!!entry.problematicaGeneral && (
              <View style={styles.card}>
                <Text style={styles.h2}>Problemática General</Text>
                <Text style={{ color: '#444' }}>{entry.problematicaGeneral}</Text>
              </View>
            )}
            {(entry.solucionGeneral || entry.images?.general || entry.images?.extras?.length) && (
              <View style={styles.card}>
                <Text style={styles.h2}>Solución General</Text>
                {!!entry.solucionGeneral && (
                  <Text style={{ color: '#444', marginBottom: 8 }}>{entry.solucionGeneral}</Text>
                )}
                {!!entry.images?.general && (
                  <>
                    <ZoomableImage source={entry.images!.general!} style={styles.diagram} caption={`${entry.name} – General`} />
                    <Text style={styles.caption}>Diagrama de la solución general</Text>
                  </>
                )}
                {!!entry.images?.extras?.length && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.legend}>Otros</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6 }}>
                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        {entry.images!.extras!.map((u, i) => (
                          <ZoomableImage key={String(i)} source={u} style={[styles.diagram, { width: 240 }]} caption={`${entry.name} – Extra ${i+1}`} />
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
          </>
        )
      )}

      {/* Caso específico */}
      {(entry.casoEspecifico || entry.solucionEspecifica || entry.images?.specific) && (
        <View style={styles.card}>
          <Text style={styles.h2}>Caso Específico</Text>
          {!!entry.casoEspecifico && (
            <Text style={{ color: '#444', marginBottom: 8 }}>{entry.casoEspecifico}</Text>
          )}
          {!!entry.solucionEspecifica && (
            <>
              <Text style={[styles.h3, { marginTop: 4 }]}>Solución Específica</Text>
              <Text style={{ color: '#444', marginBottom: 8 }}>{entry.solucionEspecifica}</Text>
            </>
          )}
          {!!entry.images?.specific && (
            <>
              <ZoomableImage source={entry.images!.specific!} style={styles.diagram} caption={`${entry.name} – Específica`} />
              <Text style={styles.caption}>Diagrama de la solución específica</Text>
            </>
          )}
        </View>
      )}

      {/* Playground */}
      <View style={styles.card}>
        <Text style={[styles.h2, { marginBottom: 8 }]}>Playground</Text>
        {!!entry.playgroundExplicacion && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{entry.playgroundExplicacion}</Text>
          </View>
        )}
        {!!entry.playgroundComoInteractuar && (
          <View style={[styles.infoBox, { backgroundColor: '#eef6ff', borderColor: '#bfdbfe' }] }>
            <Text style={[styles.infoText, { color: '#1e3a8a' }]}>{entry.playgroundComoInteractuar}</Text>
          </View>
        )}
        <Demo />
      </View>

      {/* Código (varios snippets, como en Flutter) */}
      {(entry.codeSnippets ?? []).length > 0 && (
        <View style={styles.card}>
          <Text style={[styles.h2, { marginBottom: 8 }]}>Código Fuente</Text>
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
  headerCard: { borderColor: '#e6e6e6', backgroundColor: '#f9fafb' },
  h2: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  h3: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  legend: { color: '#666', marginBottom: 6 },
  diagram: { height: 220, width: '100%', backgroundColor: '#fafafa', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  caption: { color: '#6b7280', fontSize: 12, marginTop: 6 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: '#93c5fd', backgroundColor: '#dbeafe' },
  badgeText: { color: '#1d4ed8', fontWeight: '700', fontSize: 12 },
  infoBox: { backgroundColor: '#f5f3ff', borderWidth: 1, borderColor: '#ddd6fe', borderRadius: 8, padding: 10, marginBottom: 8 },
  infoText: { color: '#4338ca', fontSize: 13 },
});
