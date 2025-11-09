import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { AutoResuelveFAQ } from './auto_resuelve_faq';
import { EquipoSeguridad } from './equipo_seguridad';
import { SoporteNivel1 } from './soporte_nivel_1';
import { SoporteNivel2 } from './soporte_nivel_2';
import { EscalamientoGerencia } from './escalamiento_gerencia';
import type { Ticket, Severity, Category } from './types';

function buildChain() {
  const h1 = new AutoResuelveFAQ();
  const h2 = h1.setNext(new EquipoSeguridad());
  const h3 = h2.setNext(new SoporteNivel1());
  const h4 = h3.setNext(new SoporteNivel2());
  h4.setNext(new EscalamientoGerencia());
  return h1;
}

export const ChainDemo: React.FC = () => {
  const chain = useMemo(() => buildChain(), []);
  const [id, setId] = useState('T-1001');
  const [severity, setSeverity] = useState<Severity>('low');
  const [category, setCategory] = useState<Category>('billing');
  const [description, setDescription] = useState('Consulta de facturación simple');
  const [result, setResult] = useState<null | { handledBy: string; message: string; trail: string[] }>(null);
  const [history, setHistory] = useState<string[]>([]);

  function run() {
    const ticket: Ticket = { id, severity, category, description };
    const trail: string[] = [];
    const out = chain.handle(ticket, trail);
    setResult(out as any);
    setHistory((h) => [`${new Date().toLocaleTimeString()} • ${ticket.id} → ${out.handledBy}`, ...h]);
  }

  function resetForm() {
    setId('T-1001'); setSeverity('low'); setCategory('billing'); setDescription('Consulta de facturación simple'); setResult(null);
  }

  function preset(kind: 'faq' | 'security' | 'l2' | 'manager' | 'l1') {
    if (kind === 'faq') { setId('T-2001'); setSeverity('low'); setCategory('billing'); setDescription('Olvidé cómo ver mis facturas'); }
    else if (kind === 'security') { setId('T-3001'); setSeverity('medium'); setCategory('security'); setDescription('Reporte de acceso sospechoso'); }
    else if (kind === 'l2') { setId('T-4001'); setSeverity('high'); setCategory('technical'); setDescription('Error crítico en producción'); }
    else if (kind === 'l1') { setId('T-5001'); setSeverity('low'); setCategory('technical'); setDescription('No carga la app a veces'); }
    else { setId('T-9001'); setSeverity('high'); setCategory('other'); setDescription('Caso no contemplado por equipos'); }
    setResult(null);
  }

  return (
    <View style={styles.box}>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>Cadena de Responsabilidad: Mesa de Ayuda</Text>
        <Text style={{ color: '#666' }}>Ruteo progresivo de tickets por reglas</Text>
      </View>

      <View style={styles.row}>
        <TextInput value={id} onChangeText={setId} style={[styles.input, { width: 120 }]} />
        <TextInput value={description} onChangeText={setDescription} style={[styles.input, { flex: 1 }]} />
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable style={styles.chip} onPress={() => setSeverity('low')}><Text>Baja</Text></Pressable>
            <Pressable style={styles.chip} onPress={() => setSeverity('medium')}><Text>Media</Text></Pressable>
            <Pressable style={styles.chip} onPress={() => setSeverity('high')}><Text>Alta</Text></Pressable>
          </View>
        </ScrollView>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <Pressable style={styles.btn} onPress={() => preset('faq')}><Text>FAQ</Text></Pressable>
        <Pressable style={styles.btn} onPress={() => preset('security')}><Text>Seguridad</Text></Pressable>
        <Pressable style={styles.btn} onPress={() => preset('l1')}><Text>Soporte L1</Text></Pressable>
        <Pressable style={styles.btn} onPress={() => preset('l2')}><Text>Soporte L2</Text></Pressable>
        <Pressable style={styles.btn} onPress={() => preset('manager')}><Text>Escalar a Manager</Text></Pressable>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <Pressable style={styles.actionBtn} onPress={run}><Text>Enviar por la cadena</Text></Pressable>
        <Pressable style={[styles.actionBtn, { backgroundColor: '#eee' }]} onPress={resetForm}><Text>Restablecer</Text></Pressable>
      </View>

      <View style={styles.card}>
        <Text style={{ fontWeight: '700' }}>Resultado</Text>
        {result ? (
          <View style={{ marginTop: 8 }}>
            <Text>{result.message}</Text>
            <Text style={{ color: '#666' }}>Atendido por: {result.handledBy}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
              {result.trail.map((n, i) => (
                <View key={i} style={styles.badge}><Text style={{ color: i === result.trail.length - 1 ? 'green' : '#666' }}>{n}</Text></View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={{ color: '#666', marginTop: 8 }}>Completa el ticket y envíalo para ver cómo la cadena lo procesa.</Text>
        )}
      </View>

      <View style={[styles.card, { marginTop: 12 }]}> 
        <Text style={{ fontWeight: '700' }}>Historial</Text>
        {history.length ? (
          <View style={{ marginTop: 8 }}>
            {history.map((h, i) => <Text key={i}>• {h}</Text>)}
          </View>
        ) : (
          <Text style={{ color: '#666', marginTop: 8 }}>Sin envíos aún</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginRight: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
  actionBtn: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#def', borderRadius: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 999, backgroundColor: '#fafafa', marginRight: 8 },
  card: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 8, marginTop: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12, backgroundColor: '#fafafa', marginRight: 6, marginTop: 6 },
});
