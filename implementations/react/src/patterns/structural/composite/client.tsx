// JsonTreeRadix.tsx
'use client';

import { useMemo, useState } from "react";
import { Badge, Box, Card, Code, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import type { Json } from "./types/json";
import { buildNode } from "./helpers/node-builder";
import type { JsonComponent } from "./component";

export function JsonTreeRadix({ data, rootLabel = "root" }: { data: Json; rootLabel?: string }) {
  const root = useMemo<JsonComponent>(() => buildNode(rootLabel, data), [data, rootLabel]);
  return (
    <Box p="4">
      <Card variant="surface">
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between">
            <Text size="5" weight="bold">JSON Composite</Text>
            <Badge variant="soft">Radix</Badge>
          </Flex>
          <Separator size="4" />
          <TreeNode node={root} path={rootLabel} depth={0} />
        </Flex>
      </Card>
    </Box>
  );
}

function TreeNode({ node, path, depth }: { node: JsonComponent; path: string; depth: number }) {
  const [open, setOpen] = useState(true);
  const hasChildren = !node.isLeaf();
  return (
    <Box>
      <Flex align="center" gap="2" px="2" py="1" style={{ paddingLeft: 8 + depth * 14 }}>
        <IconButton size="1" variant="soft" radius="full" onClick={() => hasChildren && setOpen(o => !o)} disabled={!hasChildren}>
          {hasChildren ? (open ? "▾" : "▸") : "•"}
        </IconButton>
        <Text weight="bold" size="2">{node.keyLabel}</Text>
        <Text color="gray" size="2">:</Text>
        <Code size="2">{node.getPreview()}</Code>
        <IconButton
          size="1"
          variant="ghost"
          style={{ marginLeft: "auto" }}
          onClick={() => navigator.clipboard?.writeText(path)}
          title="Copy path"
        >⧉</IconButton>
      </Flex>

      {hasChildren && open && (
        <Box ml="5" pl="2" style={{ borderLeft: "1px dashed var(--gray-6)" }}>
          {node.getChildren().map((c) => (
            <TreeNode
              key={path + "." + c.keyLabel}
              node={c}
              depth={depth + 1}
              path={/^\d+$/.test(c.keyLabel) ? `${path}[${c.keyLabel}]` : `${path}.${c.keyLabel}`}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
