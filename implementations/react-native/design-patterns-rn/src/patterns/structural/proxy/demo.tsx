import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { CachingProductProxy } from './proxy';

export default function ProxyDemo() {
  const service = useMemo(() => new CachingProductProxy(), []);
  const [id, setId] = useState('1');
  const [product, setProduct] = useState<any | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState(() => service.getStats());
  const [lastSource, setLastSource] = useState<null | 'cache' | 'network'>(null);

  async function load() {
    try {
      setBusy(true);
      setLogs((l) => [`Buscando producto ${id}…`, ...l]);
      const prev = service.getStats();
      const start = Date.now();
      const p = await service.getProduct(id);
      const ms = Math.round(Date.now() - start);
      setProduct(p);
      const next = service.getStats();
      setStats(next);
      const fromNetwork = next.networkCalls > prev.networkCalls;
      setLastSource(fromNetwork ? 'network' : 'cache');
      setLogs((l) => [`✓ ${p.name} (${ms} ms, ${fromNetwork ? 'red' : 'caché'})`, ...l]);
    } catch (e) {
      setLogs((l) => [`✗ Error al cargar: ${(e as Error).message}`, ...l]);
    } finally {
      setBusy(false);
    }
  }

  async function burst() {
    try {
      setBusy(true);
      setLogs((l) => [`Ráfaga x5 para id=${id} (solicitudes simultáneas compartidas)`, ...l]);
      const prev = service.getStats();
      const start = Date.now();
      await Promise.all(Array.from({ length: 5 }, () => service.getProduct(id)));
      const ms = Math.round(Date.now() - start);
      const next = service.getStats();
      setStats(next);
      const addedNetwork = next.networkCalls - prev.networkCalls;
      const agrupadas = Math.max(0, 5 - addedNetwork);
      setLogs((l) => [`✓ Ráfaga resuelta en ${ms} ms (red +${addedNetwork}, caché/compartidas ${agrupadas})`, ...l]);
    } catch (e) {
      setLogs((l) => [`✗ Error en ráfaga: ${(e as Error).message}`, ...l]);
    } finally {
      setBusy(false);
    }
  }

  function clearCache() {
    service.clearCache();
    setStats(service.getStats());
    setLogs((l) => ['Cache limpiada', ...l]);
    setLastSource(null);
  }

  function clearLog() { setLogs([]); }

  function quick(idValue: string) { setId(idValue); setLogs((l) => [`ID seleccionado: ${idValue}`, ...l]); }

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Patrón Proxy: Servicio de Productos</Text>
        <Text style={{ color: '#666' }}>Caché + evita solicitudes duplicadas simultáneas</Text>
      </View>

      <View style={{ marginBottom: 8 }}>
        <TextInput
          value={id}
          onChangeText={setId}
          placeholder="ID de producto (1–100)"
          style={{ borderWidth: 1, padding: 8, width: 220, marginBottom: 8 }}
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title={busy ? 'Cargando…' : 'Cargar'} onPress={load} disabled={busy} />
          <Button title="Ráfaga x5" onPress={burst} disabled={busy} />
          <Button title="Limpiar caché" onPress={clearCache} disabled={busy} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {['1','2','3','42','99'].map(q => (
            <TouchableOpacity key={q} onPress={() => quick(q)} style={{ marginRight: 8 }}>
              <Text style={{ color: id === q ? '#fff' : '#007AFF', backgroundColor: id === q ? '#007AFF' : 'transparent', padding: 6, borderRadius: 4 }}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ marginVertical: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>Stats</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          <Stat label="Cache hits" value={stats.cacheHits} />
          <Stat label="Cache misses" value={stats.cacheMisses} />
          <Stat label="Llamadas de red" value={stats.networkCalls} />
          <Stat label="Tamaño de caché" value={stats.cacheSize} />
          <Stat label="En vuelo" value={stats.inflight} />
        </View>
      </View>

      <View style={{ marginVertical: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>Resultado</Text>
        {lastSource && <Text>Origen: {lastSource === 'network' ? 'red' : 'caché'}</Text>}
        {product ? (
          <View style={{ marginTop: 8 }}>
            <Text>ID: {product.id}</Text>
            <Text>Nombre: {product.name}</Text>
            <Text>Precio: ${product.price.toFixed(2)}</Text>
          </View>
        ) : (
          <Text style={{ color: '#666', marginTop: 8 }}>Sin producto cargado. Ingresa un ID y presiona “Cargar”.</Text>
        )}
      </View>

      <View style={{ marginVertical: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Registro</Text>
          <Button title="Limpiar log" onPress={clearLog} />
        </View>
        <View style={{ backgroundColor: '#f0f0f0', borderRadius: 8, minHeight: 120, padding: 8, marginTop: 8 }}>
          {logs.length ? logs.map((l, i) => <Text key={i}>• {l}</Text>) : <Text style={{ color: '#666' }}>Aún no hay registros</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={{ padding: 8, borderWidth: 1, borderColor: '#eee', borderRadius: 6, marginRight: 8, marginBottom: 8 }}>
      <Text style={{ color: '#666' }}>{label}</Text>
      <Text style={{ fontWeight: 'bold' }}>{value}</Text>
    </View>
  );
}
