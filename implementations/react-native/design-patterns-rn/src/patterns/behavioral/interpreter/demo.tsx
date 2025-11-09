import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { parseToExpression } from './parser';

export const InterpreterDemo: React.FC = () => {
  const [input, setInput] = useState('3 + 5 * 2');
  const [rpn, setRpn] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const examples = useMemo(() => [
    '3 + 5 * 2',
    '(3 + 5) * 2',
    '8 * (2 + 2) + 1',
    '10 + 2 * (3 + 7)'
  ], []);

  function evalNow() {
    try {
      setError(null);
      const { expr, rpn } = parseToExpression(input);
      setRpn(rpn);
      setResult(expr.interpret());
    } catch (e: any) {
      setResult(null);
      setRpn('');
      setError(e?.message ?? String(e));
    }
  }

  function setExample(s: string) {
    setInput(s);
    setRpn('');
    setResult(null);
    setError(null);
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.title}>Interpreter: Mini calculadora aritmética</Text>
          <Text style={styles.subtitle}>Construye un AST (suma y multiplicación) y evalúa con interpret().</Text>
        </View>

        <View style={styles.row}>
          <TextInput value={input} onChangeText={setInput} placeholder="3 + 5 * 2" style={styles.input} />
          <Pressable onPress={evalNow} style={styles.btn}><Text>Evaluar</Text></Pressable>
          <Pressable onPress={() => setInput('')} style={styles.btn}><Text>Limpiar</Text></Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resultado</Text>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : result !== null ? (
            <Text style={styles.result}>{result}</Text>
          ) : (
            <Text style={styles.hint}>Evalúa una expresión para ver el resultado</Text>
          )}
          {rpn ? <Text style={styles.rpn}>RPN: {rpn}</Text> : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ejemplos</Text>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {examples.map((ex, i) => (
              <Pressable key={i} onPress={() => setExample(ex)} style={styles.chip}><Text>{ex}</Text></Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8, marginLeft: 8 },
  card: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
  hint: { color: '#666' },
  result: { fontSize: 20, fontWeight: '700' },
  error: { color: '#a00' },
  rpn: { marginTop: 8, color: '#444', fontSize: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 999, backgroundColor: '#fafafa', marginRight: 8, marginBottom: 8 },
});
