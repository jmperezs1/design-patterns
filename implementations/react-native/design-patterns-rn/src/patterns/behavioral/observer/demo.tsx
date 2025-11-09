import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Switch } from 'react-native';
import { MarketDataHub } from './concrete-subject';
import { ThresholdAlert } from './concrete-observer-a';
import { SimpleMovingAverage } from './concrete-observer-b';
import { TickerSnapshot } from './concrete-observer-c';

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'NVDA', 'BTC-USD'] as const;

export const ObserverDemo: React.FC = () => {
  const hub = useMemo(() => new MarketDataHub(), []);

  // Config
  const [running, setRunning] = useState(false);
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [threshold, setThreshold] = useState<string>('200');
  const [smaWindow, setSmaWindow] = useState<string>('5');

  // Observers toggles
  const [alertSub, setAlertSub] = useState(true);
  const [smaSub, setSmaSub] = useState(true);
  const [tickerSub, setTickerSub] = useState(true);
  const [logSub, setLogSub] = useState(true);

  const thresholdAlert = useMemo(() => new ThresholdAlert(symbol, Number(threshold) || 0), []);
  const sma = useMemo(() => new SimpleMovingAverage(symbol, Number(smaWindow) || 5), []);
  const snapshot = useMemo(() => new TickerSnapshot(), []);

  const [log, setLog] = useState<string[]>([]);
  const logObserver = useMemo(() => ({ update: (q: { symbol: string; price: number; ts: number }) => {
    setLog((l) => [`${new Date(q.ts).toLocaleTimeString()} • ${q.symbol} → $${q.price.toFixed(2)}`, ...l].slice(0, 40));
  }}), []);

  useEffect(() => {
    if (alertSub) hub.addObserver(thresholdAlert); else hub.removeObserver(thresholdAlert);
  }, [alertSub, hub, thresholdAlert]);
  useEffect(() => {
    if (smaSub) hub.addObserver(sma); else hub.removeObserver(sma);
  }, [smaSub, hub, sma]);
  useEffect(() => {
    if (tickerSub) hub.addObserver(snapshot); else hub.removeObserver(snapshot);
  }, [tickerSub, hub, snapshot]);
  useEffect(() => {
    if (logSub) hub.addObserver(logObserver as any); else hub.removeObserver(logObserver as any);
  }, [logSub, hub, logObserver]);

  useEffect(() => { thresholdAlert.setTargetSymbol(symbol); }, [symbol, thresholdAlert]);
  useEffect(() => { thresholdAlert.setAbove(Number(threshold) || 0); }, [threshold, thresholdAlert]);
  useEffect(() => { sma.setSymbol(symbol); }, [symbol, sma]);
  useEffect(() => { sma.setWindow(Number(smaWindow) || 1); }, [smaWindow, sma]);

  function start() { hub.start([...DEFAULT_SYMBOLS]); setRunning(true); }
  function stop() { hub.stop(); setRunning(false); }

  return (
    <View style={styles.box}>
      <ScrollView>
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.title}>Observer: Mercado en tiempo real</Text>
          <Text style={styles.subtitle}>Suscribe observadores para reaccionar a cotizaciones de símbolos.</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.formCol}>
            <Text style={styles.label}>Símbolo objetivo</Text>
            <TextInput value={symbol} onChangeText={setSymbol} style={styles.input} />
          </View>

          <View style={styles.formCol}>
            <Text style={styles.label}>Umbral de alerta (≥)</Text>
            <TextInput value={threshold} onChangeText={setThreshold} style={styles.input} keyboardType="numeric" />
          </View>

          <View style={styles.formCol}>
            <Text style={styles.label}>Ventana Promedio Móvil</Text>
            <TextInput value={smaWindow} onChangeText={setSmaWindow} style={styles.input} keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable onPress={running ? stop : start} style={[styles.btn, { backgroundColor: running ? '#fde2e2' : '#e6f4ea' }]}>
              <Text>{running ? 'Detener' : 'Iniciar'}</Text>
            </Pressable>
            <View style={styles.toggleRow}><Switch value={alertSub} onValueChange={setAlertSub} /><Text>Alerta de Umbral</Text></View>
            <View style={styles.toggleRow}><Switch value={smaSub} onValueChange={setSmaSub} /><Text>Promedio móvil</Text></View>
            <View style={styles.toggleRow}><Switch value={tickerSub} onValueChange={setTickerSub} /><Text>Tablero de símbolos</Text></View>
            <View style={styles.toggleRow}><Switch value={logSub} onValueChange={setLogSub} /><Text>Registro</Text></View>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.cardSmall}>
            <Text style={styles.cardTitle}>Alerta de Umbral</Text>
            {thresholdAlert.logs.length ? (
              thresholdAlert.logs.slice(0, 12).map((l, i) => <Text key={i}>{l}</Text>)
            ) : (
              <Text style={styles.hint}>Sin alertas aún</Text>
            )}
          </View>

          <View style={styles.cardSmall}>
            <Text style={styles.cardTitle}>Promedio móvil ({symbol})</Text>
            <Text style={styles.large}>{sma.average.toFixed ? sma.average.toFixed(2) : String(sma.average)}</Text>
            <Text style={styles.hint}>ventana {smaWindow}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.cardSmall}>
            <Text style={styles.cardTitle}>Tablero de símbolos</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {DEFAULT_SYMBOLS.map((s) => {
                const entry = snapshot.data.get(s);
                const color = entry?.direction === 'up' ? '#16a34a' : entry?.direction === 'down' ? '#dc2626' : '#6b7280';
                const label = entry ? `$${entry.price.toFixed(2)}` : '—';
                return (
                  <View key={s} style={[styles.badge, { borderColor: color }]}>
                    <Text>{s}: {label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.cardSmall}>
            <Text style={styles.cardTitle}>Registro</Text>
            {log.length ? (
              log.map((l, i) => <Text key={i}>• {l}</Text>)
            ) : (
              <Text style={styles.hint}>Aún no hay registros</Text>
            )}
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
  row: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  formCol: { flex: 1, marginRight: 8 },
  label: { color: '#444', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginRight: 8 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  card: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  grid: { flexDirection: 'row', gap: 8, marginTop: 8 },
  cardSmall: { flex: 1, borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
  hint: { color: '#666' },
  large: { fontSize: 24, fontWeight: '700' },
  badge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 6, marginRight: 8, marginBottom: 8 },
});
