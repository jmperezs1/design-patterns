import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import type { FormTemplate } from '../abstract-class';

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export function SimpleForm({ flow, fields, title }: { flow: FormTemplate; fields: Field[]; title: string }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit() {
    setStatus('loading');
    setMessage('');
    try {
      const msg = await flow.submit(formData);
      setMessage(msg);
      setStatus('done');
    } catch (err: any) {
      setMessage(err?.message ?? String(err));
      setStatus('error');
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{title}</Text>
      {fields.map((field) => (
        <View key={field.name} style={styles.field}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            value={formData[field.name] ?? ''}
            onChangeText={(t) => setFormData((p) => ({ ...p, [field.name]: t }))}
            placeholder={field.placeholder ?? ''}
            secureTextEntry={field.type === 'password'}
            style={styles.input}
          />
        </View>
      ))}

      <Pressable onPress={onSubmit} style={[styles.button, status === 'loading' && styles.buttonDisabled]} disabled={status === 'loading'}>
        <Text style={styles.buttonText}>{status === 'loading' ? 'Submitting...' : 'Submit'}</Text>
      </Pressable>

      {status === 'error' && <Text style={styles.error}>{message}</Text>}
      {status === 'done' && (
        <View style={styles.successBox}>
          <Text style={{ fontWeight: '700' }}>Success:</Text>
          <Text>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%', maxWidth: 420, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  field: { marginBottom: 10 },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 6 },
  button: { backgroundColor: '#111', padding: 10, borderRadius: 8, marginTop: 8, alignItems: 'center' },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '700' },
  error: { color: '#a00', marginTop: 8 },
  successBox: { backgroundColor: '#f6f6f6', borderRadius: 8, padding: 8, marginTop: 8 },
});
