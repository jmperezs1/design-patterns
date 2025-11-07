"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextArea,
  Separator,
  Badge,
  Callout,
} from "@radix-ui/themes";
import { BookmarkIcon, ReloadIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { EditorOriginator } from "./originator";
import { EditorCaretaker } from "./care-taker";

export default function MementoDemo() {
  const originator = useMemo(() => new EditorOriginator(), []);
  const caretaker = useMemo(() => new EditorCaretaker(originator), [originator]);

  const [text, setText] = useState(originator.getText());
  const [history, setHistory] = useState(() => caretaker.history());
  const [logs, setLogs] = useState<string[]>([]);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    originator.setText(v);
    setText(v);
  }

  function checkpoint() {
    caretaker.checkpoint("Manual");
    setHistory(caretaker.history());
    setLogs((l) => [
      `Checkpoint guardado (${new Date().toLocaleTimeString()})`,
      ...l,
    ]);
  }

  function undo() {
    caretaker.undo();
    setText(originator.getText());
    setHistory(caretaker.history());
    setLogs((l) => [
      `Deshacer → estado restaurado`,
      ...l,
    ]);
  }

  function redo() {
    caretaker.redo();
    setText(originator.getText());
    setHistory(caretaker.history());
    setLogs((l) => [
      `Rehacer → estado restaurado`,
      ...l,
    ]);
  }

  function preset(p: string) {
    originator.setText(p);
    setText(p);
  }

  return (
    <Box p="4" style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Memento: Editor con Deshacer/Rehacer</Text>
              <Text size="2" color="gray">Guarda snapshots del estado y restáuralos sin exponer detalles internos.</Text>
            </Flex>
            <Badge variant="soft" color="cyan">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "2" }} gap="3">
            <Card>
              <Text size="3" weight="bold">Contenido</Text>
              <Separator my="2" />
              <Flex direction="column" gap="3">
                <TextArea value={text} onChange={onChange} placeholder="Escribe aquí…" rows={10} />

                <Flex gap="2" wrap="wrap">
                  <Button onClick={checkpoint} size="3">
                    <BookmarkIcon /> Guardar checkpoint
                  </Button>
                  <Button onClick={undo} disabled={!caretaker.canUndo()} variant="soft" color="gray">
                    <ReloadIcon /> Deshacer
                  </Button>
                  <Button onClick={redo} disabled={!caretaker.canRedo()} variant="soft" color="indigo">
                    <ReloadIcon /> Rehacer
                  </Button>
                </Flex>

                <Flex gap="2" wrap="wrap">
                  <Button variant="soft" onClick={() => preset("Hola mundo")}>Preset: Hola mundo</Button>
                  <Button variant="soft" onClick={() => preset("Patrones de diseño en acción")}>Preset: Patrones</Button>
                  <Button variant="soft" onClick={() => preset("")}>Vaciar</Button>
                </Flex>
              </Flex>
            </Card>

            <Card>
              <Text size="3" weight="bold">Historial</Text>
              <Separator my="2" />
              {!history.length ? (
                <Text size="2" color="gray">Sin checkpoints aún</Text>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {history.map((h, i) => (
                    <li key={i}>
                      <Text color={i === history.length - 1 ? "indigo" : "gray"}>
                        #{i + 1} • {new Date(h.createdAt).toLocaleTimeString()} — {h.text.slice(0, 32) || "(vacío)"}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}

              <Callout.Root color="gray" variant="soft" style={{ marginTop: 12 }}>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Deshacer retrocede al snapshot anterior. Rehacer avanza si antes deshiciste. Guardar checkpoint limpia el historial de rehacer.
                </Callout.Text>
              </Callout.Root>
            </Card>
          </Grid>
        </Card>

        <Card>
          <Text size="3" weight="bold">Registro</Text>
          <Separator my="2" />
          {logs.length ? (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {logs.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          ) : (
            <Text size="2" color="gray">Aún no hay acciones registradas.</Text>
          )}
        </Card>
      </Flex>
    </Box>
  );
}
