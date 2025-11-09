import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Switch, Pressable } from 'react-native';
import type { Burger } from './interface-component';
import { PlainBurger } from './interface-component';
import type { AddOnKey } from './types/add-on';
import { ADDONS } from './constants/add-on';

function Row({ label, value, right }: { label: string; value?: string; right?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: right ? 'space-between' : 'flex-start', paddingVertical: 6 }}>
      <Text>{label}</Text>
      {value !== undefined && <Text>{value}</Text>}
    </View>
  );
}

export default function DecoratorDemo() {
  const [selected, setSelected] = useState<AddOnKey[]>([]);

  const { order, breakdown, total } = useMemo(() => {
    let b: Burger = new PlainBurger();
    const rows: Array<{ step: string; delta: number; subtotal: number }> = [];
    let prev = b.getCost();

    for (const key of selected) {
      b = ADDONS[key].build(b);
      const cur = b.getCost();
      rows.push({ step: ADDONS[key].label, delta: cur - prev, subtotal: cur });
      prev = cur;
    }
    return { order: b, breakdown: rows, total: b.getCost() };
  }, [selected]);

  const toggle = (k: AddOnKey) =>
    setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Patrón Decorator: Hamburguesa</Text>

      <Text style={{ marginBottom: 8 }}>Elige add-ons para envolver la hamburguesa base en decoradores.</Text>

      <View style={{ marginBottom: 12 }}>
        {Object.entries(ADDONS).map(([key, meta]) => {
          const k = key as AddOnKey;
          const checked = selected.includes(k);
          return (
            <View key={k} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 }}>
              <Text>{meta.label}</Text>
              <Switch value={checked} onValueChange={() => toggle(k)} />
            </View>
          );
        })}
      </View>

      <View style={{ borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 }}>
        <Text style={{ fontWeight: 'bold' }}>Pedido</Text>
        <Text style={{ marginVertical: 6 }}>{order.getDescription()}</Text>

        <View>
          <Row label={`Base: ${new PlainBurger().getDescription()}`} value={`$${new PlainBurger().getCost().toFixed(2)}`} />
          {breakdown.length === 0 ? (
            <Row label="Sin decoradores seleccionados" />
          ) : (
            breakdown.map((r, i) => (
              <Row key={i} label={r.step} value={`+$${r.delta.toFixed(2)}  = $${r.subtotal.toFixed(2)}`} />
            ))
          )}

          <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>Total</Text>
            <Text style={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 12, alignItems: 'flex-end' }}>
        <Pressable onPress={() => setSelected([])} style={{ padding: 8 }}>
          <Text style={{ color: '#007AFF' }}>Limpiar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
