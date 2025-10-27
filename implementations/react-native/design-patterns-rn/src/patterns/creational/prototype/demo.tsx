import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import type { EmailTemplate } from './interfaces/email-template';
import { EmailTemplatePrototype } from './concrete-prototype';

const BASES: Record<string, EmailTemplate> = {
  bienvenida: {
    from: 'team@acme.com',
    subject: '¡Bienvenido a Acme!',
    bodyHtml: '<p>Gracias por registrarte</p>',
    layout: { headerHtml: '<h1>Acme</h1>', brandColor: '#2563eb' },
    tags: ['welcome', 'onboarding'],
  },
  reset: {
    from: 'security@acme.com',
    subject: 'Restablecer contraseña',
    bodyHtml: '<p>Haz click en el enlace...</p>',
    layout: { headerHtml: '<h1>Seguridad</h1>', brandColor: '#dc2626' },
    tags: ['security'],
  },
  newsletter: {
    from: 'news@acme.com',
    subject: 'Novedades de la semana',
    bodyHtml: '<p>Estas son las novedades...</p>',
    layout: { headerHtml: '<h1>Noticias</h1>', footerHtml: '<p>© 2025</p>' },
    tags: ['news'],
  },
};

export const PrototypeDemo: React.FC = () => {
  const [baseKey, setBaseKey] = useState<keyof typeof BASES>('bienvenida');
  const [draft, setDraft] = useState<Partial<EmailTemplate>>({});
  const [outbox, setOutbox] = useState<EmailTemplate[]>([]);

  const proto = useMemo(() => new EmailTemplatePrototype(BASES[baseKey]), [baseKey]);
  const preview = useMemo(() => proto.clone(draft).get(), [proto, draft]);

  const cloneToOutbox = () => {
    const copy = proto.clone(draft).get();
    setOutbox((prev) => [copy, ...prev]);
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {Object.keys(BASES).map((k) => (
          <Chip key={k} label={k} active={k === baseKey} onPress={() => setBaseKey(k as any)} />
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Overrides</Text>
        <TextInput style={styles.input} placeholder="from" value={draft.from ?? ''} onChangeText={(v)=>setDraft({ ...draft, from: v })} />
        <TextInput style={styles.input} placeholder="subject" value={draft.subject ?? ''} onChangeText={(v)=>setDraft({ ...draft, subject: v })} />
        <TextInput style={[styles.input, { height: 80 }]} multiline placeholder="bodyHtml" value={draft.bodyHtml ?? ''} onChangeText={(v)=>setDraft({ ...draft, bodyHtml: v })} />
        <Text style={styles.subtitle}>Layout</Text>
        <TextInput style={styles.input} placeholder="layout.headerHtml" value={draft.layout?.headerHtml ?? ''}
          onChangeText={(v)=>setDraft({ ...draft, layout: { ...(draft.layout||{}), headerHtml: v } })} />
        <TextInput style={styles.input} placeholder="layout.footerHtml" value={draft.layout?.footerHtml ?? ''}
          onChangeText={(v)=>setDraft({ ...draft, layout: { ...(draft.layout||{}), footerHtml: v } })} />
        <TextInput style={styles.input} placeholder="layout.brandColor" value={draft.layout?.brandColor ?? ''}
          onChangeText={(v)=>setDraft({ ...draft, layout: { ...(draft.layout||{}), brandColor: v } })} />
        <Pressable style={styles.btn} onPress={cloneToOutbox}><Text>Clonar a Outbox</Text></Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Previsualización</Text>
        <PreviewCard tpl={preview} />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Outbox</Text>
        <View style={{ gap: 10 }}>
          {outbox.map((tpl, i) => <PreviewCard key={i} tpl={tpl} />)}
          {outbox.length === 0 && <Text style={styles.muted}>Sin elementos</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const PreviewCard: React.FC<{ tpl: EmailTemplate }> = ({ tpl }) => (
  <View style={{ gap: 4 }}>
    <Text style={styles.subtitle}>From: {tpl.from}</Text>
    <Text style={styles.subtitle}>Subject: {tpl.subject}</Text>
    <Text>Body HTML: {tpl.bodyHtml}</Text>
    {!!tpl.layout && (
      <View style={{ gap: 4 }}>
        <Text style={styles.subtitle}>Layout</Text>
        {!!tpl.layout.headerHtml && <Text>Header: {tpl.layout.headerHtml}</Text>}
        {!!tpl.layout.footerHtml && <Text>Footer: {tpl.layout.footerHtml}</Text>}
        {!!tpl.layout.brandColor && <Text>Brand: {tpl.layout.brandColor}</Text>}
      </View>
    )}
    {!!tpl.tags && <Text>Tags: {tpl.tags.join(', ')}</Text>}
  </View>
);

const Chip: React.FC<{ label: string; active?: boolean; onPress: () => void }> = ({ label, active, onPress }) => (
  <Text onPress={onPress} style={[styles.chip, active && styles.chipActive]}>{label}</Text>
);

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, gap: 8 },
  title: { fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#666' },
  muted: { color: '#777' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#ddd', borderRadius: 999 },
  chipActive: { backgroundColor: '#f3f4f6' },
  btn: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
});
