import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Book } from './element-book';
import { Electronics } from './element-electronics';
import { Grocery } from './element-grocery';
import type { Element } from './element';
import { TotalPriceVisitor } from './visitor-total-price';
import { ShippingEstimatorVisitor } from './visitor-delivery';
import { CsvExportVisitor } from './visitor-csv';

type ItemKind = 'book' | 'electronics' | 'grocery';

export const VisitorDemo: React.FC = () => {
  const [items, setItems] = useState<Array<Element>>(() => [
    new Book('Patrones de Diseño', 30, 1, false),
    new Electronics('Teclado', 80, 1, true),
    new Grocery('Café en grano', 12, 2, true),
  ]);

  const [kind, setKind] = useState<ItemKind>('book');
  const [name, setName] = useState('Nuevo ítem');
  const [price, setPrice] = useState('10');
  const [qty, setQty] = useState('1');
  const [flag, setFlag] = useState(true);

  const [totals, setTotals] = useState<{ subtotal: number; tax: number; total: number } | null>(null);
  const [shipping, setShipping] = useState<number | null>(null);
  const [csv, setCsv] = useState<string>('');

  function addItem() {
    const p = Number(price) || 0;
    const q = Math.max(1, Number(qty) || 1);
    let it: Element;
    if (kind === 'book') it = new Book(name, p, q, flag);
    else if (kind === 'electronics') it = new Electronics(name, p, q, flag);
    else it = new Grocery(name, p, q, flag);
    setItems((arr) => [...arr, it]);
  }

  function removeAt(idx: number) { setItems((arr) => arr.filter((_, i) => i !== idx)); }

  function calcTotals() {
    const v = new TotalPriceVisitor();
    for (const it of items) it.accept(v);
    setTotals({ subtotal: round(v.subtotal), tax: round(v.tax), total: round(v.total) });
  }
  function calcShipping() {
    const v = new ShippingEstimatorVisitor();
    for (const it of items) it.accept(v);
    setShipping(round(v.shipping));
  }
  function exportCsv() {
    const v = new CsvExportVisitor();
    for (const it of items) it.accept(v);
    setCsv(v.toString());
  }

  return (
    <View style={styles.box}>
      <ScrollView>
        <Text style={styles.title}>Visitor: Carrito con Operaciones</Text>
        <Text style={styles.subtitle}>Aplica distintos visitantes (totales, envío, exportación) sin modificar los elementos.</Text>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Tipo (book|electronics|grocery)</Text>
            <TextInput value={kind} onChangeText={(v) => setKind(v as ItemKind)} style={styles.input} />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Nombre/Título</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} />
          </View>
          <View style={styles.colSmall}>
            <Text style={styles.label}>Precio</Text>
            <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType='numeric' />
          </View>
          <View style={styles.colSmall}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput value={qty} onChangeText={setQty} style={styles.input} keyboardType='numeric' />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <Pressable onPress={addItem} style={styles.btn}><Text>Agregar</Text></Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ítems</Text>
          {items.length ? (
            items.map((it, i) => (
              <View key={i} style={styles.itemRow}>
                <Text>{renderItem(it)}</Text>
                <Pressable onPress={() => removeAt(i)} style={[styles.btn, styles.btnSmall]}><Text>quitar</Text></Pressable>
              </View>
            ))
          ) : (
            <Text style={styles.hint}>Carrito vacío</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Operaciones</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Pressable onPress={calcTotals} style={styles.btn}><Text>Calcular Totales</Text></Pressable>
            <Pressable onPress={calcShipping} style={[styles.btn, { backgroundColor: '#eef' }]}><Text>Estimar Envío</Text></Pressable>
            <Pressable onPress={exportCsv} style={[styles.btn, { backgroundColor: '#f7f7f7' }]}><Text>Exportar CSV</Text></Pressable>
          </View>

          {totals && (
            <View style={styles.resultBox}><Text>Subtotal: ${totals.subtotal.toFixed(2)} · Impuestos: ${totals.tax.toFixed(2)} · Total: ${totals.total.toFixed(2)}</Text></View>
          )}
          {shipping !== null && (
            <View style={styles.resultBox}><Text>Envío estimado: ${shipping.toFixed(2)}</Text></View>
          )}
          {csv && (
            <View style={[styles.resultBox, { padding: 8 }]}><Text style={{ fontFamily: 'monospace' }}>{csv}</Text></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

function renderItem(it: Element) {
  if (it instanceof Book) return `📘 Libro: ${it.title} · $${it.unitPrice} × ${it.qty} · ${it.isImported ? 'Importado' : 'Nacional'}`;
  if (it instanceof Electronics) return `🔌 Electrónica: ${it.name} · $${it.unitPrice} × ${it.qty} · ${it.fragile ? 'Frágil' : 'Normal'}`;
  if (it instanceof Grocery) return `🥫 Alimento: ${it.name} · $${it.unitPrice} × ${it.qty} · ${it.perishable ? 'Perecedero' : 'No perecedero'}`;
  return 'Ítem';
}

function round(n: number) { return Math.round(n * 100) / 100; }

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 4 },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  col: { flex: 1, marginRight: 8 },
  colSmall: { width: 100, marginRight: 8 },
  label: { color: '#444', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
  btnSmall: { paddingHorizontal: 8, paddingVertical: 6, backgroundColor: '#fee' },
  card: { borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, padding: 10, marginTop: 8 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
  hint: { color: '#666' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  resultBox: { borderWidth: 1, borderColor: '#eee', borderRadius: 6, padding: 8, marginTop: 8 },
});
