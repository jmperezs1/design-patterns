import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Receiver } from './receiver';
import { Invoker } from './invoker';
import { AddItemCommand } from './add_item_command';
import { RemoveItemCommand } from './remove_item_command';
import { ClearItemsCommand } from './clear_items_command';
import CATALOG from './data/catalog';

export const CommandDemo: React.FC = () => {
  const device = useMemo(() => new Receiver(), []);
  const [invoker, setInvoker] = useState(() => new Invoker(new AddItemCommand(device)));
  const [name, setName] = useState('');
  const [items, setItems] = useState(device.list());

  const refresh = () => setItems(device.list());

  const onAdd = () => { setInvoker((i) => { i.setCommand(new AddItemCommand(device)); return i; }); invoker.execute(name.trim()); setName(''); refresh(); };
  const onClear = () => { setInvoker((i) => { i.setCommand(new ClearItemsCommand(device)); return i; }); invoker.execute(); refresh(); };

  return (
    <View style={styles.box}>
      {/* Catalog actions (mirror web) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {CATALOG.map((it) => (
            <Pressable key={it} style={styles.chip}
              onPress={() => { setInvoker((i) => { i.setCommand(new AddItemCommand(device)); return i; }); invoker.execute(it); refresh(); }}>
              <Text>Agregar {it}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.row}>
        <TextInput placeholder="Nuevo ítem" value={name} onChangeText={setName} style={styles.input} />
        <Pressable onPress={onAdd} style={styles.btn}><Text>Añadir</Text></Pressable>
        <Pressable onPress={onClear} style={styles.btn}><Text>Limpiar todo</Text></Pressable>
      </View>

      <View style={styles.headerRow}>
        <Text style={{ width: 120, fontWeight: '700' }}>Ítem</Text>
        <Text style={{ width: 60, fontWeight: '700' }}>Cant.</Text>
        <Text style={{ flex: 1, fontWeight: '700' }}>Acciones</Text>
      </View>

      {items.map(({ key, qty }) => (
        <View key={key} style={styles.dataRow}>
          <Text style={{ width: 120 }}>{key}</Text>
          <Text style={{ width: 60 }}>{qty}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable style={styles.btn} onPress={() => { setInvoker((i) => { i.setCommand(new AddItemCommand(device)); return i; }); invoker.execute(key); refresh(); }}><Text>+</Text></Pressable>
            <Pressable style={styles.btn} onPress={() => { setInvoker((i) => { i.setCommand(new RemoveItemCommand(device)); return i; }); invoker.execute(key); refresh(); }}><Text>-</Text></Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btn: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 999, backgroundColor: '#fafafa' },
  headerRow: { flexDirection: 'row', backgroundColor: '#f8f8f8', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  dataRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, gap: 8 },
});
