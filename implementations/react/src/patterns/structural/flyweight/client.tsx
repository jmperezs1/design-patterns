"use client";

import { useMemo, useState } from "react";
import { BadgeFactory } from "./flyweight-factory";
import { makeData } from "./helpers/make-data";
import { Badge, Box, Button, Card, Flex, Grid, Separator, Text, TextField } from "@radix-ui/themes";

export default function FlyweightDemoRadix() {
  const [cantidad, setCantidad] = useState(2500);
  const items = useMemo(() => makeData(cantidad), [cantidad]);
  const factory = useMemo(() => new BadgeFactory(), []);

  const quickSet = (n: number) => setCantidad(n);

  return (
    <Box p="4" style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Card variant="surface">
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between" wrap="wrap" gap="2">
            <Text size="5" weight="bold">Patrón Flyweight: Pool de Badges</Text>
            <Badge variant="soft">Estructural</Badge>
          </Flex>

          <Text color="gray" size="2">
            Renderizamos <b>{items.length.toLocaleString()}</b> badges pero sólo creamos {" "}
            <b>{factory.size()}</b> flyweights compartidos. El estilo intrínseco (forma, padding, borde) se comparte; {""}
            los datos extrínsecos (texto, color, x/y) se pasan en cada operación.
          </Text>

          <Separator size="4" />

          <Grid columns={{ initial: "1", sm: "2" }} gap="3" align="center">
            <Flex align="center" gap="2">
              <Text size="1" color="gray">Cantidad de badges</Text>
              <TextField.Root
                type="number"
                min="1"
                step="100"
                value={cantidad}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCantidad(Math.max(1, Number(e.target.value || 0)))}
                style={{ width: 140 }}
              />
            </Flex>
            <Flex gap="2" wrap="wrap">
              <Button variant="soft" onClick={() => quickSet(500)}>500</Button>
              <Button variant="soft" onClick={() => quickSet(2500)}>2500</Button>
              <Button variant="soft" onClick={() => quickSet(5000)}>5000</Button>
            </Flex>
          </Grid>

          <Box p="2" style={{ background: "var(--indigo-2)", border: "1px solid var(--indigo-6)", borderRadius: 8 }}>
            <Text size="2" color="indigo">
              Tips: El número de flyweights no crece con la cantidad; depende de las variantes disponibles (aquí 3 estilos). Observa el contador en vivo.
            </Text>
          </Box>

          <Box
            p="2"
            style={{
              border: "1px solid var(--gray-6)",
              borderRadius: 8,
              background: "var(--gray-2)",
            }}
          >
            <Box
              style={{
                position: "relative",
                height: 420,
                overflow: "auto",
                width: "100%",
                minWidth: 980,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.03) 28px), repeating-linear-gradient(90deg, transparent, transparent 63px, rgba(0,0,0,0.03) 64px)",
                backgroundColor: "white",
              }}
            >
              {/* Cliente: por cada item pedimos al factory un flyweight y llamamos operation() con datos extrínsecos */}
              {items.map((it) =>
                factory.get(it.variant).operation({
                  text: it.text,
                  x: it.x,
                  y: it.y,
                  color: it.color,
                })
              )}
            </Box>
          </Box>

          <Flex align="center" gap="2" justify="between" wrap="wrap">
            <Text size="2">
              Flyweights en caché: <b>{factory.size()}</b>
            </Text>
            <Badge variant="soft" color="teal">Items: {items.length.toLocaleString()}</Badge>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
