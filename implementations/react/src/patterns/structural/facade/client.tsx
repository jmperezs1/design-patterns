// AppointmentDemoRadix.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Badge, Box, Button, Card, Checkbox, Code, Flex, Grid, Separator, Text, TextField
} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { PaymentGateway } from './subsystems/payment-subsystem';
import { AppointmentFacade } from './facade';



export default function AppointmentDemoRadix() {
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
    start: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16), // yyyy-mm-ddThh:mm
    end:   new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16),
    amount: 20,
    currency: 'USD' as const,
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
      slot: { resourceId: form.resourceId, start: form.start + ":00Z", end: form.end + ":00Z" },
      payment: { amount: Number(form.amount), currency: form.currency },
    });

    setOk(res.ok);
    setLogs(res.steps);
    setBusy(false);
  };

  const onChange = (k: string, v: string | number) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const setNowPlus = (hStart: number, hEnd: number) => {
    const now = Date.now();
    const s = new Date(now + hStart * 60 * 60 * 1000).toISOString().slice(0, 16);
    const e = new Date(now + hEnd * 60 * 60 * 1000).toISOString().slice(0, 16);
    setForm((prev) => ({ ...prev, start: s, end: e }));
  };

  const badgeColor = ok === null ? 'gray' : ok ? 'green' : 'crimson';

  return (
    <Box p="4" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Card variant="surface">
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between">
            <Text size="5" weight="bold">Patrón Facade: Reserva de Cita</Text>
            <Badge variant="soft" color={badgeColor as any}>{ok === null ? 'inactivo' : ok ? 'éxito' : 'falló'}</Badge>
          </Flex>
          <Text color="gray" size="2">
            El cliente llama a <Code>facade.book()</Code>. La fachada orquesta CRM, Calendario, Pagos y Notificaciones — y revierte en caso de fallo.
          </Text>

          <Separator size="4" />

          <Grid columns={{ initial: '1', sm: '2' }} gap="3">
            <Text size="1" color="gray">Nombre completo</Text>
            <TextField.Root
              placeholder="Nombre completo"
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('name', e.target.value)}
            />
            <Text size="1" color="gray">Email</Text>
            <TextField.Root
              placeholder="Email"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('email', e.target.value)}
            />
            <Text size="1" color="gray">Teléfono</Text>
            <TextField.Root
              placeholder="Teléfono"
              value={form.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('phone', e.target.value)}
            />
            <Text size="1" color="gray">Recurso (doctor / sala)</Text>
            <TextField.Root
              placeholder="Recurso (doctor / sala)"
              value={form.resourceId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('resourceId', e.target.value)}
            />
            <Text size="1" color="gray">Inicio</Text>
            <TextField.Root
              type="datetime-local"
              value={form.start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('start', e.target.value)}
            />
            <Text size="1" color="gray">Fin</Text>
            <TextField.Root
              type="datetime-local"
              value={form.end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('end', e.target.value)}
            />
            <Text size="1" color="gray">Monto</Text>
            <TextField.Root
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('amount', Number(e.target.value))}
            />
            <Text size="1" color="gray">Moneda</Text>
            <TextField.Root
              value={form.currency}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('currency', e.target.value)}
            />
          </Grid>

          <Flex gap="2" wrap="wrap">
            <Button variant="soft" onClick={() => setNowPlus(1, 2)}>Ahora +1h → +2h</Button>
            <Button variant="soft" onClick={() => setNowPlus(2, 3)}>Ahora +2h → +3h</Button>
            <Button variant="soft" onClick={() => setNowPlus(24, 25)}>Mañana +1h → +2h</Button>
          </Flex>

          {(dateError || amountError) && (
            <Box p="2" style={{ background: 'var(--amber-3)', border: '1px solid var(--amber-6)', borderRadius: 8 }}>
              <Text color="amber" size="2">{dateError ?? amountError}</Text>
            </Box>
          )}

          <Flex align="center" gap="2">
            <Checkbox checked={simulateFail} onCheckedChange={() => setSimulateFail(v => !v)} />
            <Text size="2">Simular fallo de pago (ver reversión)</Text>
          </Flex>

          <Flex gap="2">
            <Button onClick={onBook} disabled={busy || !!dateError || !!amountError}>
              {busy ? 'Reservando…' : 'Reservar cita'}
            </Button>
            <Button variant="soft" color="gray" onClick={() => setLogs([])} disabled={busy}>Limpiar log</Button>
          </Flex>

          <Separator size="4" />

          <Text size="2" weight="bold">Log</Text>
          <Box p="2" style={{ background: 'var(--gray-2)', borderRadius: 8, minHeight: 120 }}>
            {busy ? (
              <Text color="gray">Ejecutando…</Text>
            ) : logs.length === 0 ? (
              <Text color="gray">Aún no hay logs</Text>
            ) : (
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {logs.map((l, i) => <li key={i}><Text>{l}</Text></li>)}
              </ol>
            )}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}

