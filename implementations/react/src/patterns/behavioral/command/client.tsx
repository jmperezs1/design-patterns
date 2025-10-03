'use client';

import { useMemo, useState } from "react";
import { Box, Button, Card, Flex, Separator, Table, Text, Badge } from "@radix-ui/themes";
import { Receiver } from "./receiver";
import { Invoker } from "./invoker";
import { AddItemCommand } from "./add-item-command";
import { RemoveItemCommand } from "./remove-item-command";
import { ClearItemsCommand } from "./clear-item-command";
import CATALOG from "./data/catalog";


export default function CommandListRadix() {
  const device = useMemo(() => new Receiver(), []);
  const add = useMemo(() => new AddItemCommand(device), [device]);
  const remove = useMemo(() => new RemoveItemCommand(device), [device]);
  const clear = useMemo(() => new ClearItemsCommand(device), [device]);
  const invoker = useMemo(() => new Invoker(add), [add]);

  const [v, setV] = useState(0);
  const rerender = () => setV((x) => x + 1);

  const doAdd = (name: string) => {
    invoker.setCommand(add);
    invoker.executeCommand(name);
    rerender();
  };
  const doRemove = (name: string) => {
    invoker.setCommand(remove);
    invoker.executeCommand(name);
    rerender();
  };
  const doClear = () => {
    invoker.setCommand(clear);
    invoker.executeCommand();
    rerender();
  };

  const rows = device.list();

  return (
    <Box p="4" style={{ maxWidth: 720, margin: "0 auto" }}>
      <Card variant="surface">
        <Flex align="center" justify="between" mb="3" wrap="wrap" gap="3">
          <Text size="5" weight="bold">Command Pattern: Items</Text>
          <Flex gap="2" align="center">
            <Badge variant="soft">{device.size()} kind(s)</Badge>
            <Button color="crimson" variant="soft" onClick={doClear} disabled={rows.length === 0}>
              Clear all
            </Button>
          </Flex>
        </Flex>

        <Flex gap="2" wrap="wrap" mb="3">
          {CATALOG.map((name) => (
            <Button key={name} variant="soft" onClick={() => doAdd(name)}>
              + {name}
            </Button>
          ))}
        </Flex>

        <Separator my="3" />

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">Qty</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="right">Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={3}>
                  <Text color="gray">No items yet. Use the buttons above to add.</Text>
                </Table.Cell>
              </Table.Row>
            )}
            {rows.map(({ name, qty }) => (
              <Table.Row key={name}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell align="center">{qty}</Table.Cell>
                <Table.Cell align="right">
                  <Flex gap="2" justify="end">
                    <Button variant="soft" onClick={() => doRemove(name)} disabled={qty <= 0}>-</Button>
                    <Button variant="soft" onClick={() => doAdd(name)}>+</Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>

      <Text size="1" color="gray">Render v{v}</Text>
    </Box>
  );
}
