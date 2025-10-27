import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { PricingContext, StandardClientPriceStrategy, GoldClientPriceStrategy, PlatinumClientPriceStrategy, VIPClientPriceStrategy } from './strategy';
import { PRODUCTS } from './data/products';

type Kind = 'standard' | 'gold' | 'platinum' | 'vip';

export const StrategyDemo: React.FC = () => {
  const [kind, setKind] = useState<Kind>('standard');
  const [qty, setQty] = useState<Record<string, number>>(() => Object.fromEntries(PRODUCTS.map(p => [p.id, 1])));
  const ctx = useMemo(() => new PricingContext(new StandardClientPriceStrategy()), []);

  const applyKind = () => {
    switch (kind) {
      case 'gold': ctx.setStrategy(new GoldClientPriceStrategy()); break;
      case 'platinum': ctx.setStrategy(new PlatinumClientPriceStrategy()); break;
      case 'vip': ctx.setStrategy(new VIPClientPriceStrategy()); break;
      default: ctx.setStrategy(new StandardClientPriceStrategy());
    }
  };

  applyKind();

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(['standard','gold','platinum','vip'] as Kind[]).map((k) => (
          <Text key={k} onPress={() => setKind(k)} style={[styles.chip, kind===k && styles.chipActive]}>{k}</Text>
        ))}
      </View>

      <View style={{ gap: 10 }}>
        {PRODUCTS.map((p) => {
          const q = qty[p.id] ?? 1;
          const unit = ctx.getUnitPrice(p.baseUnitPrice);
          const total = ctx.getTotal(p.baseUnitPrice, q);
          return (
            <View key={p.id} style={styles.card}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image source={{ uri: p.imageUrl }} style={styles.img} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700' }}>{p.name}</Text>
                  {!!p.description && <Text style={{ color: '#666' }}>{p.description}</Text>}
                  <Text style={{ marginTop: 4 }}>Precio unitario: ${unit.toFixed(2)}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <Text>Cant.</Text>
                    <Pressable style={styles.btn} onPress={() => setQty((m) => ({ ...m, [p.id]: Math.max(1, (m[p.id] ?? 1) - 1) }))}><Text>-</Text></Pressable>
                    <TextInput keyboardType="number-pad" value={String(q)} onChangeText={(v) => setQty((m) => ({ ...m, [p.id]: Math.max(1, parseInt(v || '1', 10) || 1) }))} style={styles.qty} />
                    <Pressable style={styles.btn} onPress={() => setQty((m) => ({ ...m, [p.id]: (m[p.id] ?? 1) + 1 }))}><Text>+</Text></Pressable>
                    <Text style={{ marginLeft: 'auto', fontWeight: '700' }}>${total.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#ddd', borderRadius: 999 },
  chipActive: { backgroundColor: '#f3f4f6' },
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  img: { width: 120, height: 80, borderRadius: 8, backgroundColor: '#eee' },
  qty: { width: 48, textAlign: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingVertical: 4 },
  btn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#f3f3f3', borderRadius: 8 },
});
