import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from 'react-native';
import type { Target } from './target';
import type { User } from './interfaces/user';

type Props = { api: Target; pageSize?: number };

export const ClientListRN: React.FC<Props> = ({ api, pageSize = 10 }) => {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<Error | null>(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    api
      .request()
      .then((data) => !cancel && setRows(data))
      .catch((e) => !cancel && setErr(e as Error))
      .finally(() => !cancel && setLoading(false));
    return () => {
      cancel = true;
    };
  }, [api]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (u) => String(u.id).includes(s) || u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s)
    );
  }, [rows, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [filtered, pageSafe, pageSize]
  );

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <TextInput
          placeholder="Buscar id, nombre, email…"
          value={q}
          onChangeText={(v) => {
            setQ(v);
            setPage(1);
          }}
          style={styles.input}
        />
        <Text style={styles.muted}>{loading ? 'Cargando…' : `${filtered.length} resultado(s)`}</Text>
        <View style={styles.spacer} />
        <Pressable
          style={[styles.btn, (pageSafe === 1 || loading) && styles.btnDisabled]}
          disabled={pageSafe === 1 || loading}
          onPress={() => setPage((p) => Math.max(1, p - 1))}
        >
          <Text>Anterior</Text>
        </Pressable>
        <Text style={{ marginHorizontal: 8 }}>Página {pageSafe} / {totalPages}</Text>
        <Pressable
          style={[styles.btn, (pageSafe === totalPages || loading) && styles.btnDisabled]}
          disabled={pageSafe === totalPages || loading}
          onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          <Text>Siguiente</Text>
        </Pressable>
      </View>

      <View style={styles.headerRow}>
        <Text style={[styles.th, { width: 80 }]}>ID</Text>
        <Text style={[styles.th, { flex: 1 }]}>Nombre</Text>
        <Text style={[styles.th, { flex: 1 }]}>Email</Text>
      </View>

      {loading ? (
        <View>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={styles.skelRow}>
              <View style={[styles.skel, { width: 50 }]} />
              <View style={[styles.skel, { flex: 1, marginLeft: 8 }]} />
              <View style={[styles.skel, { flex: 1, marginLeft: 8 }]} />
            </View>
          ))}
        </View>
      ) : pageRows.length === 0 ? (
        <View style={{ paddingVertical: 24, alignItems: 'center' }}>
          <Text style={styles.muted}>Sin resultados</Text>
        </View>
      ) : (
        <FlatList
          data={pageRows}
          keyExtractor={(u) => String(u.id)}
          renderItem={({ item }) => (
            <View style={styles.dataRow}>
              <Text style={{ width: 80 }}>{item.id}</Text>
              <Text style={{ flex: 1, fontWeight: '600' }}>{item.name}</Text>
              <Text style={{ flex: 1 }}>{item.email}</Text>
            </View>
          )}
        />
      )}

      {!!error && (
        <Text style={{ color: 'red', marginTop: 6 }}>Error: {String(error.message || error)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', gap: 8 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  spacer: { flex: 1 },
  input: { flexGrow: 1, minWidth: 200, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  muted: { color: '#666' },
  btn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: '#f3f3f3' },
  btnDisabled: { opacity: 0.6 },
  headerRow: { flexDirection: 'row', backgroundColor: '#f8f8f8', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  th: { fontWeight: '700', color: '#333' },
  dataRow: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 },
  skelRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8 },
  skel: { height: 18, backgroundColor: '#eee', borderRadius: 4 },
});
