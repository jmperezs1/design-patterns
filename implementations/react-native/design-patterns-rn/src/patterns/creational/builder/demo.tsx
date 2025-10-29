import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Card } from './product-card';
import { CardDirector } from './director';
import { CardConcreteBuilder } from './concrete-builder';

export const BuilderDemo: React.FC = () => {
  const director = useMemo(() => new CardDirector(), []);
  const [title, setTitle] = useState('MacBook Pro 14"');
  const [subtitle, setSubtitle] = useState('M3 Pro');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop');
  const [body, setBody] = useState('Pantalla Liquid Retina XDR y batería de larga duración.');
  const [footer, setFooter] = useState('Comprar');

  const build = () => {
    const builder = new CardConcreteBuilder();
    return director.construct(builder, {
      title: title.trim() || undefined,
      subtitle: subtitle.trim() || undefined,
      mediaUrl: mediaUrl.trim() || undefined,
      body: body.trim() || undefined,
      footer: footer.trim() ? <Text style={{ color: '#2563eb' }}>{footer.trim()}</Text> : undefined,
    });
  };

  const product = build();

  return (
    <View style={{ gap: 12 }}>
      <View style={styles.formRow}><Text style={styles.label}>Title</Text><TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} /></View>
      <View style={styles.formRow}><Text style={styles.label}>Subtitle</Text><TextInput style={styles.input} placeholder="Subtítulo" value={subtitle} onChangeText={setSubtitle} /></View>
      <View style={styles.formRow}><Text style={styles.label}>Media URL</Text><TextInput style={styles.input} placeholder="https://..." value={mediaUrl} onChangeText={setMediaUrl} /></View>
      <View style={styles.formRow}><Text style={styles.label}>Body Text</Text><TextInput style={styles.input} placeholder="Cuerpo" value={body} onChangeText={setBody} /></View>
      <View style={styles.formRow}><Text style={styles.label}>Footer Text</Text><TextInput style={styles.input} placeholder="Pie" value={footer} onChangeText={setFooter} /></View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable style={styles.btn} onPress={() => { setTitle(''); setSubtitle(''); setMediaUrl(''); setBody(''); setFooter(''); }}><Text>Limpiar</Text></Pressable>
        <Pressable style={[styles.btn, { backgroundColor: '#eef2ff' }]} onPress={() => { /* no-op, rebuild happens automatically via state */ }}><Text>Reconstruir</Text></Pressable>
      </View>
      <Card {...product} />
    </View>
  );
};

const styles = StyleSheet.create({
  formRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { width: 90, color: '#374151' },
  input: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: 'white' },
  btn: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f3f4f6', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
});
