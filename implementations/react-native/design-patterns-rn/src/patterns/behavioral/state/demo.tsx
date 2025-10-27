import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { TicketContext } from './context';

export const StateDemo: React.FC = () => {
  const ctx = useMemo(() => new TicketContext(), []);
  const [error, setError] = useState<string | null>(null);
  const [, rerender] = useState(0);
  const refresh = () => rerender((x) => x + 1);
  const onAdvance = () => {
    try {
      setError(null);
      ctx.request();
      refresh();
    } catch (e: any) {
      setError(e?.message ?? String(e));
      refresh();
    }
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ticket</Text>
      <Text style={styles.muted}>Estado: {ctx.state.name}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {ctx.state.name === 'Nuevo' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Borrador</Text>
          <TextInput
            style={styles.input}
            placeholder="Título del ticket"
            value={ctx.draftTitle}
            onChangeText={(t) => { ctx.draftTitle = t; refresh(); }}
          />
          <DraftTasks ctx={ctx} onChange={refresh} />
          <Pressable style={styles.btn} onPress={onAdvance}>
            <Text>Crear ticket</Text>
          </Pressable>
        </View>
      )}
      {ctx.state.name === 'En progreso' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{ctx.title}</Text>
          <View style={{ gap: 6 }}>
            {ctx.tasks.map((t) => (
              <View key={t.id} style={styles.taskRow}>
                <View style={[styles.checkbox, t.done && styles.checkboxDone]} />
                <Text style={[styles.taskText, t.done && styles.taskDone]}>{t.title}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.btn} onPress={onAdvance}>
            <Text>Marcar siguiente tarea</Text>
          </Pressable>
        </View>
      )}
      {ctx.state.name === 'Cerrado' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{ctx.title}</Text>
          <Text style={styles.muted}>Cerrado: {ctx.closedAt?.toLocaleString()}</Text>
          <Pressable style={styles.btn} onPress={onAdvance}>
            <Text>Reiniciar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const DraftTasks: React.FC<{ ctx: TicketContext; onChange: () => void }> = ({ ctx, onChange }) => {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    ctx.draftTasks.push(v);
    setDraft('');
    onChange();
  };
  const remove = (idx: number) => {
    ctx.draftTasks.splice(idx, 1);
    onChange();
  };
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Nueva tarea"
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={add}
        />
        <Pressable style={styles.btn} onPress={add}><Text>Agregar</Text></Pressable>
      </View>
      <View style={{ gap: 6 }}>
        {ctx.draftTasks.map((t, i) => (
          <View key={`${t}-${i}`} style={styles.draftRow}>
            <Text>{t}</Text>
            <Pressable onPress={() => remove(i)}><Text style={styles.remove}>Quitar</Text></Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, gap: 10 },
  title: { fontWeight: '700' },
  muted: { color: '#666' },
  error: { color: '#b00020' },
  section: { gap: 10 },
  sectionTitle: { fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btn: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#f3f3f3' },
  draftRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
  remove: { color: '#b00020' },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: '#aaa' },
  checkboxDone: { backgroundColor: '#4caf50' },
  taskText: {},
  taskDone: { textDecorationLine: 'line-through', color: '#777' },
});
