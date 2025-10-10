// BridgeDemoRadix.tsx
'use client';

import { useMemo, useState } from "react";
import { Box, Button, Card, Flex, Select, Separator, Text, TextArea } from "@radix-ui/themes";
import type { Exporter } from "../implementor";
import { JsonExporter } from "../json-implementor";
import { CsvExporter } from "../csv-implementor";
import { OrdersReport } from "../order-abstraction";
import { InventoryReport } from "../inventory-abstraction";
import type { Report } from "../abstraction";



const SAMPLE_ORDERS = [
  { id: "O-1001", customer: "Ada Lovelace", total: 120.5, status: "paid" },
  { id: "O-1002", customer: "Linus Torvalds", total: 89.0, status: "pending" },
];
const SAMPLE_INVENTORY = [
  { sku: "KB-01", name: "Keyboard", stock: 3,  min: 5 },
  { sku: "MN-27", name: "27” Monitor", stock: 12, min: 4 },
];

type ReportKind = "orders" | "inventory";
type ExporterKind = "csv" | "json" ;

export default function BridgeDemoRadix() {
  const [reportKind, setReportKind] = useState<ReportKind>("orders");
  const [exporterKind, setExporterKind] = useState<ExporterKind>("csv");
  const [output, setOutput] = useState<string>("");

  const exporter: Exporter = useMemo(() => {
    switch (exporterKind) {
      case "json": return new JsonExporter();
      default:     return new CsvExporter();
    }
  }, [exporterKind]);

  const report: Report = useMemo(() => {
    return reportKind === "orders"
      ? new OrdersReport(exporter, SAMPLE_ORDERS)
      : new InventoryReport(exporter, SAMPLE_INVENTORY);
  }, [reportKind, exporter]);

  const onExport = async () => {
    const res = await report.generateReport();
    setOutput(res.text);
    const blob = new Blob([res.text], { type: res.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = res.filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box p="4" style={{ maxWidth: 900, margin: "0 auto" }}>
      <Card variant="surface">
        <Flex direction="column" gap="3">
          <Text size="5" weight="bold">Bridge Pattern: Reportes × Exportadores</Text>

          <Flex gap="3" wrap="wrap">
            <Flex align="center" gap="2">
              <Text size="2" color="gray">Reporte</Text>
              <Select.Root value={reportKind} onValueChange={(v) => setReportKind(v as ReportKind)}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="orders">Órdenes</Select.Item>
                  <Select.Item value="inventory">Inventario</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex align="center" gap="2">
              <Text size="2" color="gray">Exportador</Text>
              <Select.Root value={exporterKind} onValueChange={(v) => setExporterKind(v as ExporterKind)}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="csv">CSV</Select.Item>
                  <Select.Item value="json">JSON</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Button onClick={onExport}>Exportar</Button>
          </Flex>

          <Separator my="2" />

          <Text size="2" color="gray">Vista previa</Text>
          <TextArea value={output} onChange={() => {}} rows={14} />
        </Flex>
      </Card>
    </Box>
  );
}
