import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const FactoryDemo: React.FC = () => {
  const [last, setLast] = useState<string | null>(null);
  const trigger = (v: string) => setLast(v);

  return (
    <View style={styles.wrap}>
      <Text style={styles.h3}>Factory Pattern (demo)</Text>
      <Text style={styles.p}>
        La “fábrica” centraliza cómo crear notificaciones a partir de un variant.
      </Text>
      <View style={styles.row}>
        <Button title="Success" onPress={() => trigger('success')} />
        <Button title="Alert" onPress={() => trigger('alert')} />
        <Button title="Info" onPress={() => trigger('informative')} />
        <Button title="Warning" onPress={() => trigger('warning')} />
      </View>
      {!!last && <Text style={styles.note}>Último disparo: {last}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  h3: { fontSize: 18, fontWeight: '700' },
  p: { color: '#666' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  note: { marginTop: 8, fontStyle: 'italic' },
});
