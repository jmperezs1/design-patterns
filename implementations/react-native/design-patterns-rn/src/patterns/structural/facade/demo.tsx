import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, TextInput, Switch, Button, Pressable } from 'react-native';
import { PaymentGateway } from './subsystems/payment-subsystem';
import { AppointmentFacade } from './facade';

function Row({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <View style={{ marginVertical: 6 }}>
      <Text style={{ color: '#444', marginBottom: 4 }}>{label}</Text>
      {children}
    </View>
  );
}

export default function AppointmentDemo() {
  const [simulateFail, setSimulateFail] = useState(false);

  const facade = useMemo(() => {
    const failingPayments = new PaymentGateway(simulateFail);
    return new AppointmentFacade(undefined, failingPayments);
  }, [simulateFail]);

  const [form, setForm] = useState({
    name: 'Ada Lovelace',
    email: 'ada@math.org',
    phone: '+57 3000000000',
    resourceId: 'doctor-42',
    start: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16),
    amount: '20',
    currency: 'USD',
  });

  const [busy, setBusy] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [ok, setOk] = useState<boolean | null>(null);

  const startDate = useMemo(() => new Date(form.start + ':00Z'), [form.start]);
  const endDate = useMemo(() => new Date(form.end + ':00Z'), [form.end]);
  const dateError = useMemo(() => {
    if (!form.start || !form.end) return 'Inicio y fin son obligatorios';
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 'Fecha/hora inválida';
    if (startDate >= endDate) return 'Fin debe ser después de inicio';
    return null;
  }, [form.start, form.end, startDate, endDate]);
  const amountError = useMemo(() => (Number(form.amount) > 0 ? null : 'El monto debe ser > 0'), [form.amount]);

  const onBook = async () => {
    setBusy(true);
    setLogs([]);
    setOk(null);

    const res = await facade.book({
      customer: { name: form.name, email: form.email, phone: form.phone },
      slot: { resourceId: form.resourceId, start: form.start + ':00Z', end: form.end + ':00Z' },
      payment: { amount: Number(form.amount), currency: form.currency as any },
    });

    setOk(res.ok);
    setLogs(res.steps);
    setBusy(false);
  };

  const onChange = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Patrón Facade: Reserva de Cita</Text>

      <Row label="Nombre completo">
        <TextInput value={form.name} onChangeText={(t) => onChange('name', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Email">
        <TextInput value={form.email} onChangeText={(t) => onChange('email', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Teléfono">
        <TextInput value={form.phone} onChangeText={(t) => onChange('phone', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Recurso (doctor / sala)">
        <TextInput value={form.resourceId} onChangeText={(t) => onChange('resourceId', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Inicio">
        <TextInput value={form.start} onChangeText={(t) => onChange('start', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Fin">
        <TextInput value={form.end} onChangeText={(t) => onChange('end', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Monto">
        <TextInput value={form.amount} onChangeText={(t) => onChange('amount', t)} keyboardType="numeric" style={{ borderWidth: 1, padding: 8 }} />
      </Row>
      <Row label="Moneda">
        <TextInput value={form.currency} onChangeText={(t) => onChange('currency', t)} style={{ borderWidth: 1, padding: 8 }} />
      </Row>

      {(dateError || amountError) && (
        <View style={{ backgroundColor: '#fff3cd', borderRadius: 8, padding: 8, marginVertical: 8 }}>
          <Text style={{ color: '#856404' }}>{dateError ?? amountError}</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Switch value={simulateFail} onValueChange={() => setSimulateFail(v => !v)} />
        <Text style={{ marginLeft: 8 }}>Simular fallo de pago (ver reversión)</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title={busy ? 'Reservando…' : 'Reservar cita'} onPress={onBook} disabled={busy || !!dateError || !!amountError} />
        <Pressable onPress={() => setLogs([])} style={{ marginLeft: 8 }}>
          <Text style={{ color: '#007AFF', padding: 8 }}>Limpiar log</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: 'bold' }}>Log</Text>
        <View style={{ backgroundColor: '#f0f0f0', borderRadius: 8, minHeight: 120, padding: 8 }}>
          {busy ? (
            <Text style={{ color: '#666' }}>Ejecutando…</Text>
          ) : logs.length === 0 ? (
            <Text style={{ color: '#666' }}>Aún no hay logs</Text>
          ) : (
            <View>
              {logs.map((l, i) => <Text key={i}>• {l}</Text>)}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
