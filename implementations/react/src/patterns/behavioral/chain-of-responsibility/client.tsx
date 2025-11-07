"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextField,
  Select,
  Separator,
  Badge,
  Callout,
} from "@radix-ui/themes";
import { CheckCircledIcon, InfoCircledIcon, RocketIcon, ResetIcon } from "@radix-ui/react-icons";
import type { Ticket, Severity, Category } from "./types/types";
import { AutoResuelveFAQ } from "./concrete-handler-1";
import { EquipoSeguridad } from "./concrete-handler-2";
import { SoporteNivel1 } from "./concrete-handler-3";
import { SoporteNivel2 } from "./concrete-handler-4";
import { EscalamientoGerencia } from "./concrete-handler-5";

function buildChain() {
  const h1 = new AutoResuelveFAQ();
  const h2 = h1.setNext(new EquipoSeguridad());
  const h3 = h2.setNext(new SoporteNivel1());
  const h4 = h3.setNext(new SoporteNivel2());
  h4.setNext(new EscalamientoGerencia());
  return h1; // cabeza de la cadena
}

export default function ChainOfResponsibilityDemo() {
  const chain = useMemo(() => buildChain(), []);
  const [id, setId] = useState("T-1001");
  const [severity, setSeverity] = useState<Severity>("low");
  const [category, setCategory] = useState<Category>("billing");
  const [description, setDescription] = useState("Consulta de facturación simple");
  const [result, setResult] = useState<null | { handledBy: string; message: string; trail: string[] }>(null);
  const [history, setHistory] = useState<string[]>([]);

  function run() {
    const ticket: Ticket = { id, severity, category, description };
    const trail: string[] = [];
    const out = chain.handle(ticket, trail);
    setResult(out);
    setHistory((h) => [
      `${new Date().toLocaleTimeString()} • ${ticket.id} → ${out.handledBy}`,
      ...h
    ]);
  }

  function resetForm() {
    setId("T-1001");
    setSeverity("low");
    setCategory("billing");
    setDescription("Consulta de facturación simple");
    setResult(null);
  }

  function preset(kind: "faq" | "security" | "l2" | "manager" | "l1") {
    if (kind === "faq") {
      setId("T-2001"); setSeverity("low"); setCategory("billing"); setDescription("Olvidé cómo ver mis facturas");
    } else if (kind === "security") {
      setId("T-3001"); setSeverity("medium"); setCategory("security"); setDescription("Reporte de acceso sospechoso");
    } else if (kind === "l2") {
      setId("T-4001"); setSeverity("high"); setCategory("technical"); setDescription("Error crítico en producción");
    } else if (kind === "l1") {
      setId("T-5001"); setSeverity("low"); setCategory("technical"); setDescription("No carga la app a veces");
    } else {
      setId("T-9001"); setSeverity("high"); setCategory("other"); setDescription("Caso no contemplado por equipos");
    }
    setResult(null);
  }

  return (
    <Box p="4" style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Cadena de Responsabilidad: Mesa de Ayuda</Text>
              <Text size="2" color="gray">Ruteo progresivo de tickets por reglas</Text>
            </Flex>
            <Badge color="cyan" variant="soft">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "2" }} gap="3">
            <Card>
              <Text size="3" weight="bold">Ticket</Text>
              <Separator my="2" />
              <Flex direction="column" gap="3">
                <TextField.Root value={id} onChange={(e) => setId(e.target.value)} aria-label="ID de ticket" placeholder="ID" />

                <Flex gap="3" wrap="wrap">
                  <Flex direction="column" gap="1" style={{ minWidth: 220 }}>
                    <Text size="2" color="gray">Severidad</Text>
                    <Select.Root value={severity} onValueChange={(v) => setSeverity(v as Severity)}>
                      <Select.Trigger placeholder="Severidad" />
                      <Select.Content>
                        <Select.Item value="low">Baja</Select.Item>
                        <Select.Item value="medium">Media</Select.Item>
                        <Select.Item value="high">Alta</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>

                  <Flex direction="column" gap="1" style={{ minWidth: 220 }}>
                    <Text size="2" color="gray">Categoría</Text>
                    <Select.Root value={category} onValueChange={(v) => setCategory(v as Category)}>
                      <Select.Trigger placeholder="Categoría" />
                      <Select.Content>
                        <Select.Item value="billing">Facturación</Select.Item>
                        <Select.Item value="technical">Técnica</Select.Item>
                        <Select.Item value="security">Seguridad</Select.Item>
                        <Select.Item value="other">Otra</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>
                </Flex>

                <TextField.Root value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Descripción" placeholder="Describe el problema" />

                <Flex gap="2" wrap="wrap">
                  <Button onClick={run} size="3">
                    <RocketIcon /> Enviar por la cadena
                  </Button>
                  <Button onClick={resetForm} variant="soft" color="gray">
                    <ResetIcon /> Restablecer
                  </Button>
                </Flex>
              </Flex>
            </Card>

            <Card>
              <Text size="3" weight="bold">Atajos</Text>
              <Separator my="2" />
              <Grid columns={{ initial: "2", sm: "3" }} gap="2">
                <Button variant="soft" onClick={() => preset("faq")}>FAQ (Facturación, Baja)</Button>
                <Button variant="soft" onClick={() => preset("security")}>Seguridad</Button>
                <Button variant="soft" onClick={() => preset("l1")}>Soporte L1</Button>
                <Button variant="soft" onClick={() => preset("l2")}>Soporte L2</Button>
                <Button variant="soft" onClick={() => preset("manager")}>Escalar a Manager</Button>
              </Grid>

              <Callout.Root color="gray" variant="soft" style={{ marginTop: 12 }}>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  La cadena configurada es: AutoResuelveFAQ → EquipoSeguridad → SoporteNivel1 → SoporteNivel2 → EscalamientoGerencia.
                </Callout.Text>
              </Callout.Root>
            </Card>
          </Grid>
        </Card>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Resultado</Text>
            <Separator my="2" />
            {result ? (
              <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                  <CheckCircledIcon />
                  <Text>
                    {result.message}
                  </Text>
                </Flex>
                <Text size="2" color="gray">Atendido por: <b>{result.handledBy}</b></Text>
                <Text size="2" color="gray">Ruta en la cadena:</Text>
                <Flex wrap="wrap" gap="2">
                  {result.trail.map((n, i) => (
                    <Badge key={i} variant="soft" color={i === result.trail.length - 1 ? "green" : "gray"}>{n}</Badge>
                  ))}
                </Flex>
              </Flex>
            ) : (
              <Callout.Root color="gray" variant="soft">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>Completa el ticket y envíalo para ver cómo la cadena lo procesa.</Callout.Text>
              </Callout.Root>
            )}
          </Card>

          <Card>
            <Text size="3" weight="bold">Historial</Text>
            <Separator my="2" />
            {history.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {history.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            ) : (
              <Text size="2" color="gray">Sin envíos aún</Text>
            )}
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}
