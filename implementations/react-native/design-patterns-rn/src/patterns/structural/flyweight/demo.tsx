import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import { BadgeFactory } from './flyweight-factory';
import { makeData } from './helpers/make-data';

export default function FlyweightDemo() {
  const [cantidad, setCantidad] = useState(2500);
  const items = useMemo(() => makeData(cantidad), [cantidad]);
  const factory = useMemo(() => new BadgeFactory(), []);

  const quickSet = (n: number) => setCantidad(n);

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Patrón Flyweight: Pool de Badges</Text>
      </View>

      <Text style={{ color: '#444', marginBottom: 8 }}>
        Renderizamos <Text style={{ fontWeight: '700' }}>{items.length.toLocaleString()}</Text> badges pero sólo creamos {' '}
        <Text style={{ fontWeight: '700' }}>{factory.size()}</Text> flyweights compartidos.
      </Text>

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <Text>Cantidad:</Text>
        <TextInput
          style={{ borderWidth: 1, width: 140, padding: 6 }}
          value={String(cantidad)}
          keyboardType="numeric"
          onChangeText={(t) => setCantidad(Math.max(1, Number(t || 0)))}
        />
        <Button title="500" onPress={() => quickSet(500)} />
        <Button title="2500" onPress={() => quickSet(2500)} />
        <Button title="5000" onPress={() => quickSet(5000)} />
      </View>

      <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fff', padding: 8 }}>
        <View style={{ position: 'relative', height: 420, width: '100%', minWidth: 980 }}>
          {items.map((it) =>
            factory.get(it.variant).operation({ text: it.text, x: it.x, y: it.y, color: it.color })
          )}
        </View>
      </View>

      <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>Flyweights en caché: <Text style={{ fontWeight: '700' }}>{factory.size()}</Text></Text>
        <Text>Items: {items.length.toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
}
