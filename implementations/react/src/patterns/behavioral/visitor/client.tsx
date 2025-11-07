"use client";

import { useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextField,
  Select,
  Checkbox,
  Separator,
  Badge,
  Callout,
} from "@radix-ui/themes";
import { PlusIcon, TrashIcon, InfoCircledIcon, TableIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Book } from "./element-book";
import { Electronics } from "./element-electronics";
import { Grocery } from "./element-grocery";
import type { Element } from "./element";
import { TotalPriceVisitor } from "./visitor-total-price";
import { ShippingEstimatorVisitor } from "./visitor-delivery";
import { CsvExportVisitor } from "./visitor.csv";

type ItemKind = "book" | "electronics" | "grocery";

export default function VisitorDemo() {
  const [items, setItems] = useState<Array<Element>>(() => [
    new Book("Patrones de Diseño", 30, 1, false),
    new Electronics("Teclado", 80, 1, true),
    new Grocery("Café en grano", 12, 2, true),
  ]);

  const [kind, setKind] = useState<ItemKind>("book");
  const [name, setName] = useState("Nuevo ítem");
  const [price, setPrice] = useState("10");
  const [qty, setQty] = useState("1");
  const [flag, setFlag] = useState(true);

  const [totals, setTotals] = useState<{ subtotal: number; tax: number; total: number } | null>(null);
  const [shipping, setShipping] = useState<number | null>(null);
  const [csv, setCsv] = useState<string>("");

  function addItem() {
    const p = Number(price) || 0;
    const q = Math.max(1, Number(qty) || 1);
    let it: Element;
    if (kind === "book") it = new Book(name, p, q, flag);
    else if (kind === "electronics") it = new Electronics(name, p, q, flag);
    else it = new Grocery(name, p, q, flag);
    setItems((arr) => [...arr, it]);
  }

  function removeAt(idx: number) {
    setItems((arr) => arr.filter((_, i) => i !== idx));
  }

  function calcTotals() {
    const v = new TotalPriceVisitor();
    for (const it of items) it.accept(v);
    setTotals({ subtotal: round(v.subtotal), tax: round(v.tax), total: round(v.total) });
  }
  function calcShipping() {
    const v = new ShippingEstimatorVisitor();
    for (const it of items) it.accept(v);
    setShipping(round(v.shipping));
  }
  function exportCsv() {
    const v = new CsvExportVisitor();
    for (const it of items) it.accept(v);
    setCsv(v.toString());
  }

  return (
    <Box p="4" style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Visitor: Carrito con Operaciones</Text>
              <Text size="2" color="gray">Aplica distintos visitantes (totales, envío, exportación) sin modificar los elementos.</Text>
            </Flex>
            <Badge variant="soft" color="cyan">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "3" }} gap="3" align="end">
            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Tipo</Text>
              <Select.Root value={kind} onValueChange={(v) => setKind(v as ItemKind)}>
                <Select.Trigger placeholder="Tipo" />
                <Select.Content>
                  <Select.Item value="book">Libro</Select.Item>
                  <Select.Item value="electronics">Electrónica</Select.Item>
                  <Select.Item value="grocery">Alimento</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Nombre/Título</Text>
              <TextField.Root value={name} onChange={(e: ChangeEvent<HTMLInputElement> | any) => setName((e.target as HTMLInputElement).value)} placeholder="Nombre" />
            </Flex>

            <Grid columns={{ initial: "2" }} gap="2" align="end">
              <Flex direction="column" gap="1">
                <Text size="2" color="gray">Precio</Text>
                <TextField.Root value={price} onChange={(e: any) => setPrice(e.target.value)} placeholder="10" />
              </Flex>
              <Flex direction="column" gap="1">
                <Text size="2" color="gray">Cantidad</Text>
                <TextField.Root value={qty} onChange={(e: any) => setQty(e.target.value)} placeholder="1" />
              </Flex>
            </Grid>

            <Flex align="center" gap="2">
              <Checkbox checked={flag} onCheckedChange={(v) => setFlag(Boolean(v))} />
              <Text size="2" color="gray">
                {kind === "book" ? "Importado" : kind === "electronics" ? "Frágil" : "Perecedero"}
              </Text>
            </Flex>

            <Button onClick={addItem} size="3">
              <PlusIcon /> Agregar
            </Button>
          </Grid>
        </Card>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Ítems</Text>
            <Separator my="2" />
            {items.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {items.map((it, i) => (
                  <li key={i}>
                    {renderItem(it)}
                    <Button variant="soft" color="red" size="1" onClick={() => removeAt(i)} style={{ marginLeft: 8 }}>
                      <TrashIcon /> quitar
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <Text size="2" color="gray">Carrito vacío</Text>
            )}
          </Card>

          <Card>
            <Text size="3" weight="bold">Operaciones</Text>
            <Separator my="2" />
            <Flex gap="2" wrap="wrap">
              <Button onClick={calcTotals} size="3">Calcular Totales</Button>
              <Button onClick={calcShipping} variant="soft" color="indigo"><TableIcon /> Estimar Envío</Button>
              <Button onClick={exportCsv} variant="soft" color="gray"><DownloadIcon /> Exportar CSV</Button>
            </Flex>

            <div className="mt-3 space-y-2">
              {totals && (
                <div className="rounded-md border p-2 text-sm">
                  Subtotal: <b>${totals.subtotal.toFixed(2)}</b> · Impuestos: <b>${totals.tax.toFixed(2)}</b> · Total: <b>${totals.total.toFixed(2)}</b>
                </div>
              )}
              {shipping !== null && (
                <div className="rounded-md border p-2 text-sm">
                  Envío estimado: <b>${shipping.toFixed(2)}</b>
                </div>
              )}
              {csv && (
                <pre className="rounded-md border p-2 overflow-auto" style={{ maxHeight: 240 }}>
{csv}
                </pre>
              )}

              {!totals && shipping === null && !csv && (
                <Callout.Root color="gray" variant="soft">
                  <Callout.Icon><InfoCircledIcon /></Callout.Icon>
                  <Callout.Text>Aplica una operación para ver resultados (totales, envío o CSV).</Callout.Text>
                </Callout.Root>
              )}
            </div>
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}

function renderItem(it: Element) {
  if (it instanceof Book) return (
    <span>📘 Libro: <b>{it.title}</b> · ${it.unitPrice} × {it.qty} · {it.isImported ? "Importado" : "Nacional"}</span>
  );
  if (it instanceof Electronics) return (
    <span>🔌 Electrónica: <b>{it.name}</b> · ${it.unitPrice} × {it.qty} · {it.fragile ? "Frágil" : "Normal"}</span>
  );
  if (it instanceof Grocery) return (
    <span>🥫 Alimento: <b>{it.name}</b> · ${it.unitPrice} × {it.qty} · {it.perishable ? "Perecedero" : "No perecedero"}</span>
  );
  return <span>Ítem</span>;
}

function round(n: number) { return Math.round(n * 100) / 100; }
