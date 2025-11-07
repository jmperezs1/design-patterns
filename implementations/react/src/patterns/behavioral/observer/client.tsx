"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, Flex, Grid, Text, TextField, Select, Badge, Separator, Callout, Switch } from "@radix-ui/themes";
import { PlayIcon, StopIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { MarketDataHub } from "./concrete-subject";
import { ThresholdAlert } from "./concrete-observer-a";
import { SimpleMovingAverage } from "./concrete-observer-b";
import { TickerSnapshot } from "./concrete-observer-c";

const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "NVDA", "BTC-USD"] as const;

export default function ObserverDemo() {
  const hub = useMemo(() => new MarketDataHub(), []);

  // Configuración
  const [running, setRunning] = useState(false);
  const [symbol, setSymbol] = useState<string>("AAPL");
  const [threshold, setThreshold] = useState<string>("200");
  const [smaWindow, setSmaWindow] = useState<string>("5");

  // Observers
  const [alertSub, setAlertSub] = useState(true);
  const [smaSub, setSmaSub] = useState(true);
  const [tickerSub, setTickerSub] = useState(true);
  const [logSub, setLogSub] = useState(true);

  const thresholdAlert = useMemo(() => new ThresholdAlert(symbol, Number(threshold) || 0), []);
  const sma = useMemo(() => new SimpleMovingAverage(symbol, Number(smaWindow) || 5), []);
  const snapshot = useMemo(() => new TickerSnapshot(), []);

  // Visual state maintained by simple inline observers
  const [log, setLog] = useState<string[]>([]);
  const logObserver = useMemo(() => ({ update: (q: { symbol: string; price: number; ts: number }) => {
    setLog((l) => [`${new Date(q.ts).toLocaleTimeString()} • ${q.symbol} → $${q.price.toFixed(2)}`, ...l].slice(0, 40));
  }}), []);

  // Wire/unwire observers based on toggles
  useEffect(() => {
    if (alertSub) hub.addObserver(thresholdAlert); else hub.removeObserver(thresholdAlert);
  }, [alertSub, hub, thresholdAlert]);
  useEffect(() => {
    if (smaSub) hub.addObserver(sma); else hub.removeObserver(sma);
  }, [smaSub, hub, sma]);
  useEffect(() => {
    if (tickerSub) hub.addObserver(snapshot); else hub.removeObserver(snapshot);
  }, [tickerSub, hub, snapshot]);
  useEffect(() => {
    if (logSub) hub.addObserver(logObserver as any); else hub.removeObserver(logObserver as any);
  }, [logSub, hub, logObserver]);

  // React to config changes (symbol/threshold/window)
  useEffect(() => {
    thresholdAlert.setTargetSymbol(symbol);
  }, [symbol, thresholdAlert]);
  useEffect(() => {
    thresholdAlert.setAbove(Number(threshold) || 0);
  }, [threshold, thresholdAlert]);
  useEffect(() => {
    sma.setSymbol(symbol);
  }, [symbol, sma]);
  useEffect(() => {
    sma.setWindow(Number(smaWindow) || 1);
  }, [smaWindow, sma]);

  function start() { hub.start([...DEFAULT_SYMBOLS]); setRunning(true); }
  function stop() { hub.stop(); setRunning(false); }

  return (
    <Box p="4" style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Observer: Mercado en tiempo real</Text>
              <Text size="2" color="gray">Suscribe observadores para reaccionar a cotizaciones de símbolos.</Text>
            </Flex>
            <Badge variant="soft" color="cyan">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "3" }} gap="3" align="end">
            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Símbolo objetivo</Text>
              <Select.Root value={symbol} onValueChange={(v) => setSymbol(v)}>
                <Select.Trigger placeholder="Símbolo" />
                <Select.Content>
                  {DEFAULT_SYMBOLS.map((s) => (
                    <Select.Item key={s} value={s}>{s}</Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Umbral de alerta (≥)</Text>
              <TextField.Root value={threshold} onChange={(e) => setThreshold(e.target.value)} placeholder="200" />
            </Flex>

            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Ventana Promedio Móvil</Text>
              <TextField.Root value={smaWindow} onChange={(e) => setSmaWindow(e.target.value)} placeholder="5" />
            </Flex>
          </Grid>

          <Separator my="3" />

          <Flex gap="2" wrap="wrap" align="center">
            <Button onClick={running ? stop : start} color={running ? "red" : "green"} size="3">
              {running ? <StopIcon /> : <PlayIcon />}
              {running ? "Detener" : "Iniciar"}
            </Button>
            <Flex align="center" gap="2">
              <Switch checked={alertSub} onCheckedChange={setAlertSub} />
              <Text>Alerta de Umbral</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Switch checked={smaSub} onCheckedChange={setSmaSub} />
              <Text>Promedio móvil</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Switch checked={tickerSub} onCheckedChange={setTickerSub} />
              <Text>Tablero de símbolos</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Switch checked={logSub} onCheckedChange={setLogSub} />
              <Text>Registro</Text>
            </Flex>
          </Flex>
        </Card>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Alerta de Umbral</Text>
            <Separator my="2" />
            {thresholdAlert.logs.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {thresholdAlert.logs.slice(0, 12).map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            ) : (
              <Text size="2" color="gray">Sin alertas aún</Text>
            )}
          </Card>

          <Card>
            <Text size="3" weight="bold">Promedio móvil ({symbol})</Text>
            <Separator my="2" />
            <Flex align="baseline" gap="2">
              <Text size="8" weight="bold">{sma.average.toFixed ? sma.average.toFixed(2) : sma.average}</Text>
              <Text size="2" color="gray">ventana {smaWindow}</Text>
            </Flex>
            <Callout.Root color="gray" variant="soft" style={{ marginTop: 12 }}>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Se actualiza sólo con ticks del símbolo seleccionado.</Callout.Text>
            </Callout.Root>
          </Card>
        </Grid>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Tablero de símbolos</Text>
            <Separator my="2" />
            <Flex gap="2" wrap="wrap">
              {DEFAULT_SYMBOLS.map((s) => {
                const entry = snapshot.data.get(s);
                const color = entry?.direction === "up" ? "green" : entry?.direction === "down" ? "red" : "gray";
                const label = entry ? `$${entry.price.toFixed(2)}` : "—";
                return (
                  <Badge key={s} variant="soft" color={color as any}>
                    {s}: {label}
                  </Badge>
                );
              })}
            </Flex>
          </Card>

          <Card>
            <Text size="3" weight="bold">Registro</Text>
            <Separator my="2" />
            {log.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {log.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            ) : (
              <Text size="2" color="gray">Aún no hay registros</Text>
            )}
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}
