import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { EditorOriginator } from './originator';
import { EditorCaretaker } from './care-taker';

export const MementoDemo: React.FC = () => {
  const originator = useMemo(() => new EditorOriginator(), []);
  const caretaker = useMemo(() => new EditorCaretaker(originator), [originator]);

  const [text, setText] = useState(originator.getText());
  const [history, setHistory] = useState(() => caretaker.history());
  const [logs, setLogs] = useState<string[]>([]);

  function onChange(v: string) {
    originator.setText(v);
    setText(v);
  }

  function checkpoint() {
    caretaker.checkpoint('Manual');
    setHistory(caretaker.history());
    setLogs(l => [`Checkpoint guardado (${new Date().toLocaleTimeString()})`, ...l]);
  }

  function undo() {
    caretaker.undo();
    setText(originator.getText());
    setHistory(caretaker.history());
    setLogs(l => [`Deshacer → estado restaurado`, ...l]);
  }

  function redo() {
    caretaker.redo();
    setText(originator.getText());
    setHistory(caretaker.history());
    setLogs(l => [`Rehacer → estado restaurado`, ...l]);
  }

  function preset(p: string) {
    originator.setText(p);
    setText(p);
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.title}>Memento: Editor con Deshacer/Rehacer</Text>
          <Text style={styles.subtitle}>Guarda snapshots del estado y restáuralos sin exponer detalles internos.</Text>
        </View>

        <View style={styles.row}>
          <TextInput value={text} onChangeText={onChange} placeholder="Escribe aquí..." style={styles.input} multiline numberOfLines={6} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Acciones</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Pressable onPress={checkpoint} style={styles.btn}><Text>Guardar checkpoint</Text></Pressable>
            <Pressable onPress={undo} style={[styles.btn, !caretaker.canUndo() && styles.disabled]} disabled={!caretaker.canUndo()}><Text>Deshacer</Text></Pressable>
            <Pressable onPress={redo} style={[styles.btn, !caretaker.canRedo() && styles.disabled]} disabled={!caretaker.canRedo()}><Text>Rehacer</Text></Pressable>
          </View>

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <Pressable onPress={() => preset('Hola mundo')} style={styles.chip}><Text>Preset: Hola mundo</Text></Pressable>
            <Pressable onPress={() => preset('Patrones de diseño en acción')} style={styles.chip}><Text>Preset: Patrones</Text></Pressable>
            <Pressable onPress={() => preset('')} style={styles.chip}><Text>Vaciar</Text></Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historial</Text>
          {history.length === 0 ? (
            <Text style={styles.hint}>Sin checkpoints aún</Text>
          ) : (
            <View style={{ marginTop: 6 }}>
              {history.map((h, i) => (
                <Text key={i} style={{ color: i === history.length - 1 ? '#4f46e5' : '#666' }}>
                  #{i + 1} • {new Date(h.createdAt).toLocaleTimeString()} — {h.text.slice(0, 32) || '(vacío)'}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registro</Text>
          {logs.length ? (
            <View style={{ marginTop: 6 }}>
              {logs.map((l, i) => <Text key={i}>• {l}</Text>)}
            </View>
          ) : (
            <Text style={styles.hint}>Aún no hay acciones registradas.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 4 },
  row: { marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, minHeight: 120, textAlignVertical: 'top' },
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8, marginRight: 8 },
  card: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
  hint: { color: '#666' },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 999, backgroundColor: '#fafafa', marginRight: 8, marginBottom: 8 },
  disabled: { opacity: 0.5 },
});
