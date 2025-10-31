"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { CachingProductProxy } from "./proxy";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextField,
  Badge,
  Separator,
  Callout,
  ScrollArea,
} from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  LightningBoltIcon,
  ReloadIcon,
  TrashIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

type ProductResult = Awaited<ReturnType<CachingProductProxy["getProduct"]>>;

export default function ProxyDemo() {
  const service = useMemo(() => new CachingProductProxy(), []);
  const [id, setId] = useState("1");
  const [product, setProduct] = useState<ProductResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState(() => service.getStats());
  const [lastSource, setLastSource] = useState<null | 'cache' | 'network'>(null);

  async function load() {
    try {
      setBusy(true);
      setLogs((l) => [`Buscando producto ${id}…`, ...l]);
      const prev = service.getStats();
      const start = performance.now();
      const p = await service.getProduct(id);
      const ms = Math.round(performance.now() - start);
      setProduct(p);
      const next = service.getStats();
      setStats(next);
      const fromNetwork = next.networkCalls > prev.networkCalls;
      setLastSource(fromNetwork ? 'network' : 'cache');
      setLogs((l) => [`✓ ${p.name} (${ms} ms, ${fromNetwork ? 'red' : 'caché'})`, ...l]);
    } catch (e) {
      setLogs((l) => [`✗ Error al cargar: ${(e as Error).message}`, ...l]);
    } finally {
      setBusy(false);
    }
  }

  async function burst() {
    try {
      setBusy(true);
  setLogs((l) => [`Ráfaga x5 para id=${id} (solicitudes simultáneas compartidas)`, ...l]);
      const prev = service.getStats();
      const start = performance.now();
      await Promise.all(Array.from({ length: 5 }, () => service.getProduct(id)));
      const ms = Math.round(performance.now() - start);
      const next = service.getStats();
      setStats(next);
      const addedNetwork = next.networkCalls - prev.networkCalls;
  const agrupadas = Math.max(0, 5 - addedNetwork);
  setLogs((l) => [`✓ Ráfaga resuelta en ${ms} ms (red +${addedNetwork}, caché/compartidas ${agrupadas})`, ...l]);
    } catch (e) {
      setLogs((l) => [`✗ Error en ráfaga: ${(e as Error).message}`, ...l]);
    } finally {
      setBusy(false);
    }
  }

  function clearCache() {
    service.clearCache();
    setStats(service.getStats());
    setLogs((l) => ["Cache limpiada", ...l]);
    setLastSource(null);
  }

  function clearLog() {
    setLogs([]);
  }

  function quick(idValue: string) {
    setId(idValue);
    setLogs((l) => [`ID seleccionado: ${idValue}`, ...l]);
  }

  return (
    <Box p="4" style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        {/* Header */}
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold" style={{ margin: 0 }}>
                Patrón Proxy: Servicio de Productos
              </Text>
              <Text size="2" color="gray">
                Caché + evita solicitudes duplicadas simultáneas
              </Text>
            </Flex>
            <Badge color="indigo" variant="soft">
              Estructural
            </Badge>
          </Flex>

          <Separator my="3" size="4" />

          {/* Controls */}
          <Flex align="center" wrap="wrap" gap="2">
            <TextField.Root
              value={id}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
              placeholder="ID de producto (1–100)"
              size="3"
              aria-label="ID de producto"
              style={{ width: 220 }}
            />
            <Button onClick={load} disabled={busy} size="3">
              <MagnifyingGlassIcon />
              {busy ? "Cargando…" : "Cargar"}
            </Button>
            <Button onClick={burst} disabled={busy} size="3" variant="soft" color="indigo">
              <LightningBoltIcon />
              Ráfaga x5
            </Button>
            <Button onClick={clearCache} disabled={busy} size="3" variant="soft" color="gray">
              <ReloadIcon />
              Limpiar caché
            </Button>

            <Flex gap="2" ml="auto" wrap="wrap">
              <Text size="2" color="gray">
                IDs rápidos:
              </Text>
              {["1", "2", "3", "42", "99"].map((q) => (
                <Button key={q} variant={id === q ? "solid" : "soft"} size="2" onClick={() => quick(q)}>
                  {q}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Card>

        {/* Stats */}
        <Grid columns={{ initial: "1", sm: "2", md: "5" }} gap="3">
          <StatCard label="Cache hits" value={stats.cacheHits} color="teal" />
          <StatCard label="Cache misses" value={stats.cacheMisses} color="amber" />
          <StatCard label="Llamadas de red" value={stats.networkCalls} color="indigo" />
          <StatCard label="Tamaño de caché" value={stats.cacheSize} color="gray" />
          <StatCard label="En vuelo" value={stats.inflight} color="purple" />
        </Grid>

        {/* Result + Log */}
        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Flex align="center" justify="between" wrap="wrap" gap="2">
              <Text size="4" weight="bold">
                Resultado
              </Text>
              {lastSource && (
                <Badge variant="soft" color={lastSource === 'network' ? 'indigo' : 'teal'}>
                  Origen: {lastSource === 'network' ? 'red' : 'caché'}
                </Badge>
              )}
            </Flex>
            <Separator my="2" size="4" />
            {product ? (
              <Flex asChild direction="column" gap="2">
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li>
                    <Text size="2" color="gray">
                      ID:
                    </Text>{" "}
                    <Text weight="medium">{product.id}</Text>
                  </li>
                  <li>
                    <Text size="2" color="gray">
                      Nombre:
                    </Text>{" "}
                    <Text weight="medium">{product.name}</Text>
                  </li>
                  <li>
                    <Text size="2" color="gray">
                      Precio:
                    </Text>{" "}
                    <Text weight="medium">${product.price.toFixed(2)}</Text>
                  </li>
                </ul>
              </Flex>
            ) : (
              <Callout.Root color="gray" variant="soft">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>Sin producto cargado. Ingresa un ID y presiona “Cargar”.</Callout.Text>
              </Callout.Root>
            )}
          </Card>

          <Card>
            <Flex align="center" justify="between">
              <Text size="4" weight="bold">
                Registro
              </Text>
              <Button variant="soft" color="gray" size="2" onClick={clearLog}>
                <TrashIcon /> Limpiar log
              </Button>
            </Flex>
            <Separator my="2" size="4" />
            <ScrollArea type="auto" scrollbars="vertical" style={{ height: 220 }}>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {logs.length ? (
                  logs.map((l, i) => <li key={i}>{l}</li>)
                ) : (
                  <Text size="2" color="gray">
                    Aún no hay registros
                  </Text>
                )}
              </ol>
            </ScrollArea>
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}

function StatCard(props: { label: string; value: number | string; color?: any }) {
  return (
    <Card>
      <Flex direction="column" gap="1">
        <Text size="2" color="gray">
          {props.label}
        </Text>
        <Text size="6" weight="bold">
          {props.value}
        </Text>
        <Badge variant="soft" color={props.color ?? "gray"} style={{ alignSelf: "start" }}>
          {props.label}
        </Badge>
      </Flex>
    </Card>
  );
}
