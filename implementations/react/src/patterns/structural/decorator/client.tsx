// BurgerClientRadix.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Badge, Box, Button, Card, Checkbox, Flex, Separator, Table, Text
} from '@radix-ui/themes';
import type { Burger } from './interface-component';
import { PlainBurger } from './concrete-component';
import type { AddOnKey } from './types/add-on';
import { ADDONS } from './constants/add-on';







export default function BurgerClientRadix() {
  const [selected, setSelected] = useState<AddOnKey[]>([]);

  // Build final burger and compute a price breakdown (delta per decorator)
  const { order, breakdown, total } = useMemo(() => {
    let b: Burger = new PlainBurger();
    const rows: Array<{ step: string; delta: number; subtotal: number }> = [];
    let prev = b.getCost();

    for (const key of selected) {
      b = ADDONS[key].build(b);
      const cur = b.getCost();
      rows.push({ step: ADDONS[key].label, delta: cur - prev, subtotal: cur });
      prev = cur;
    }
    return { order: b, breakdown: rows, total: b.getCost() };
  }, [selected]);

  const toggle = (k: AddOnKey) =>
    setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  return (
    <Box p="4" style={{ maxWidth: 780, margin: '0 auto' }}>
      <Card variant="surface">
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between">
            <Text size="5" weight="bold">Patrón Decorator: Hamburguesa</Text>
            <Badge variant="soft">Radix UI</Badge>
          </Flex>

          <Text color="gray" size="2">
            Cada add-on es un <i>decorador</i> que envuelve la hamburguesa actual y ajusta la descripción y el costo.
          </Text>

          <Separator size="4" />

          {/* Toggles (choose decorators) */}
          <Flex direction="column" gap="2">
            {Object.entries(ADDONS).map(([key, meta]) => {
              const k = key as AddOnKey;
              return (
                <label key={k}>
                  <Flex align="center" gap="2">
                    <Checkbox checked={selected.includes(k)} onCheckedChange={() => toggle(k)} />
                    <Text size="2">{meta.label}</Text>
                  </Flex>
                </label>
              );
            })}
          </Flex>

          <Separator size="4" />

          {/* Resumen */}
          <Text size="3" weight="bold">Pedido</Text>
          <Text size="2">{order.getDescription()}</Text>

          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Decorador aplicado (en orden)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="right">Δ Precio</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="right">Subtotal</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><Text color="gray">Base: Hamburguesa sencilla</Text></Table.Cell>
                <Table.Cell align="right"><Text color="gray">—</Text></Table.Cell>
                <Table.Cell align="right">${new PlainBurger().getCost().toFixed(2)}</Table.Cell>
              </Table.Row>
              {breakdown.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={3}><Text color="gray">Sin decoradores seleccionados</Text></Table.Cell>
                </Table.Row>
              ) : (
                breakdown.map((r, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{r.step}</Table.Cell>
                    <Table.Cell align="right">+${r.delta.toFixed(2)}</Table.Cell>
                    <Table.Cell align="right">${r.subtotal.toFixed(2)}</Table.Cell>
                  </Table.Row>
                ))
              )}
              {/* Total row */}
              <Table.Row>
                <Table.Cell />
                <Table.Cell align="right"><Text weight="bold">Total</Text></Table.Cell>
                <Table.Cell align="right"><Text weight="bold">${total.toFixed(2)}</Text></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Flex gap="2" justify="end">
            <Button variant="soft" onClick={() => setSelected([])}>Limpiar</Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
