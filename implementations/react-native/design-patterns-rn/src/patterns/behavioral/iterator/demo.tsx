import React, { useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Playlist } from './concrete-aggregate';
import type { Song } from './types';

export const IteratorDemo: React.FC = () => {
  const playlist = useMemo(() => new Playlist(), []);
  const iteratorRef = useRef<ReturnType<Playlist['createIterator']> | null>(null);

  const [title, setTitle] = useState('Nueva canción');
  const [artist, setArtist] = useState('Artista');
  const [, setVersion] = useState(0);
  const [current, setCurrent] = useState<Song | null>(null);
  const [lastMsg, setLastMsg] = useState<string | null>(null);

  function bump() { setVersion((v) => v + 1); }

  function addSong() {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    playlist.add({ id, title: title || 'Untitled', artist: artist || 'Unknown' });
    setLastMsg(`Agregada: ${title} — ${artist}`);
    bump();
  }

  function createIterator() {
    iteratorRef.current = playlist.createIterator();
    iteratorRef.current.reset();
    setCurrent(null);
    setLastMsg('Iterador creado');
  }

  function next() {
    if (!iteratorRef.current) createIterator();
    const it = iteratorRef.current!;
    if (!it.hasNext()) { setLastMsg('No hay más elementos'); return; }
    try {
      const s = it.next();
      setCurrent(s);
      setLastMsg(`Siguiente: ${s.title} — ${s.artist}`);
    } catch (e: any) { setLastMsg(e?.message ?? String(e)); }
    bump();
  }

  function removeCurrent() {
    const it = iteratorRef.current;
    if (!it) { setLastMsg('Crea un iterador y avanza antes de eliminar'); return; }
    try {
      it.remove();
      setLastMsg('Elemento eliminado');
      setCurrent(null);
      bump();
    } catch (e: any) { setLastMsg(e?.message ?? String(e)); }
  }

  function reset() {
    if (!iteratorRef.current) { setLastMsg('Iterador no inicializado — creando uno'); createIterator(); return; }
    iteratorRef.current.reset();
    setCurrent(null);
    setLastMsg('Iterador reiniciado');
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.title}>Iterator: Reproduciendo una playlist</Text>
          <Text style={styles.subtitle}>Ejemplo simple de un iterador sobre una colección de canciones.</Text>
        </View>

        <View style={styles.formRow}>
          <TextInput value={title} onChangeText={setTitle} placeholder="Título" style={styles.input} />
          <TextInput value={artist} onChangeText={setArtist} placeholder="Artista" style={[styles.input, { marginLeft: 8 }]} />
          <Pressable onPress={addSong} style={styles.btn}><Text>Agregar</Text></Pressable>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Playlist ({playlist.length})</Text>
            {playlist.length ? (
              playlist.length ? (
                playlist['length'] && (
                  <View style={{ marginTop: 8 }}>
                    {Array.from({ length: playlist.length }).map((_, i) => {
                      const s = playlist.getAt(i);
                      return (
                        <Text key={s.id} style={{ marginBottom: 6 }}>{i + 1}. <Text style={{ fontWeight: '700' }}>{s.title}</Text> · <Text style={{ color: '#666' }}>{s.artist}</Text></Text>
                      );
                    })}
                  </View>
                )
              ) : null
            ) : (
              <Text style={{ color: '#666' }}>La playlist está vacía</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Iteración</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Pressable onPress={createIterator} style={styles.btn}><Text>Crear iterador</Text></Pressable>
              <Pressable onPress={next} style={styles.btn}><Text>Siguiente</Text></Pressable>
              <Pressable onPress={removeCurrent} style={[styles.btn, { backgroundColor: '#ffecec' }]}><Text>Eliminar</Text></Pressable>
              <Pressable onPress={reset} style={[styles.btn, { backgroundColor: '#f3f3f3' }]}><Text>Reiniciar</Text></Pressable>
            </View>

            <View style={{ marginTop: 12 }}>
              {current ? (
                <Text style={{ padding: 8, borderWidth: 1, borderColor: '#eee', borderRadius: 8 }}>Reproduciendo: <Text style={{ fontWeight: '700' }}>{current.title}</Text> · {current.artist}</Text>
              ) : (
                <Text style={{ color: '#666' }}>{lastMsg ?? 'Ningún elemento seleccionado'}</Text>
              )}
            </View>
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
  formRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8, marginLeft: 8 },
  grid: { flexDirection: 'row', gap: 12, marginTop: 8 },
  card: { flex: 1, borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
});
