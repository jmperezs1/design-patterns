import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import type { Exporter } from '../implementor';
import { CsvExporter, JsonExporter } from '../implementor';
import { OrdersReport } from '../order-report';
import { InventoryReport } from '../inventory-report';
import type { Report } from '../abstraction';

const SAMPLE_ORDERS = [
  { id: 'O-1001', customer: 'Ada Lovelace', total: 120.5, status: 'paid' },
  { id: 'O-1002', customer: 'Linus Torvalds', total: 89.0, status: 'pending' },
];
const SAMPLE_INVENTORY = [
  { sku: 'KB-01', name: 'Keyboard', stock: 3, min: 5 },
  { sku: 'MN-27', name: '27” Monitor', stock: 12, min: 4 },
];

type ReportKind = 'orders' | 'inventory';
type ExporterKind = 'csv' | 'json';

export const BridgeDemoRN: React.FC = () => {
  const [reportKind, setReportKind] = useState<ReportKind>('orders');
  const [exporterKind, setExporterKind] = useState<ExporterKind>('csv');
  const [output, setOutput] = useState('');

  const exporter: Exporter = useMemo(() => {
    return exporterKind === 'json' ? new JsonExporter() : new CsvExporter();
  }, [exporterKind]);

  const report: Report = useMemo(() => {
    return reportKind === 'orders'
      ? new OrdersReport(exporter, SAMPLE_ORDERS)
      : new InventoryReport(exporter, SAMPLE_INVENTORY);
  }, [reportKind, exporter]);

  const onExport = async () => {
    const res = await report.generateReport();
    setOutput(res.text);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bridge Pattern: Reportes × Exportadores</Text>

      <View style={styles.row}>
        <Segmented
          label="Reporte"
          options={[
            { value: 'orders', label: 'Órdenes' },
            { value: 'inventory', label: 'Inventario' },
          ]}
          value={reportKind}
          onChange={(v) => setReportKind(v as ReportKind)}
        />
        <Segmented
          label="Exportador"
          options={[
            { value: 'csv', label: 'CSV' },
            { value: 'json', label: 'JSON' },
          ]}
          value={exporterKind}
          onChange={(v) => setExporterKind(v as ExporterKind)}
        />
        <Pressable onPress={onExport} style={styles.btn}><Text>Exportar</Text></Pressable>
      </View>

      <Text style={styles.muted}>Vista previa</Text>
      <TextInput
        style={styles.output}
        value={output}
        onChangeText={() => {}}
        multiline
        numberOfLines={14}
      />
    </View>
  );
};

const Segmented: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ label, options, value, onChange }) => (
  <View style={{ alignItems: 'flex-start' }}>
    <Text style={styles.muted}>{label}</Text>
    <View style={styles.segmented}>
      {options.map((opt) => (
        <Pressable
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={[styles.segment, value === opt.value && styles.segmentActive]}
        >
          <Text style={value === opt.value ? styles.segmentLabelActive : styles.segmentLabel}>{opt.label}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', gap: 10 },
  title: { fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  btn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
  muted: { color: '#666' },
  output: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 10, fontFamily: 'monospace' },
  segmented: { flexDirection: 'row', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, overflow: 'hidden' },
  segment: { paddingHorizontal: 10, paddingVertical: 8 },
  segmentActive: { backgroundColor: '#eaeaea' },
  segmentLabel: { color: '#333' },
  segmentLabelActive: { color: '#111', fontWeight: '600' },
});
