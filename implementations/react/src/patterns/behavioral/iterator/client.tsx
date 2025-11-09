"use client";

import { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextField,
  Separator,
  Badge,
  Callout,
} from "@radix-ui/themes";
import { PlayIcon, ChevronRightIcon, TrashIcon, StopIcon } from "@radix-ui/react-icons";
import { Playlist } from "./concrete-aggregate";
import type { Song } from "./types/type";

export default function IteratorDemo() {
  const playlist = useMemo(() => new Playlist(), []);
  const iteratorRef = useRef<ReturnType<Playlist["createIterator"]> | null>(null);

  // form
  const [title, setTitle] = useState("Nueva canción");
  const [artist, setArtist] = useState("Artista");

  // render state
  const [, setVersion] = useState(0);
  const [current, setCurrent] = useState<Song | null>(null);
  const [lastMsg, setLastMsg] = useState<string | null>(null);

  function bump() { setVersion((v) => v + 1); }

  function addSong() {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    playlist.add({ id, title: title || "Untitled", artist: artist || "Unknown" });
    setLastMsg(`Agregada: ${title} — ${artist}`);
    bump();
  }

  function createIterator() {
    iteratorRef.current = playlist.createIterator();
    iteratorRef.current.reset();
    setCurrent(null);
    setLastMsg("Iterador creado");
  }

  function next() {
    if (!iteratorRef.current) createIterator();
    const it = iteratorRef.current!;
    if (!it.hasNext()) {
      setLastMsg("No hay más elementos");
      return;
    }
    try {
      const s = it.next();
      setCurrent(s);
      setLastMsg(`Siguiente: ${s.title} — ${s.artist}`);
    } catch (e: any) {
      setLastMsg(e?.message ?? String(e));
    }
    bump();
  }

  function removeCurrent() {
    const it = iteratorRef.current;
    if (!it) { setLastMsg("Crea un iterador y avanza antes de eliminar"); return; }
    try {
      it.remove();
      setLastMsg("Elemento eliminado");
      setCurrent(null);
      bump();
    } catch (e: any) {
      setLastMsg(e?.message ?? String(e));
    }
  }

  function reset() {
    if (!iteratorRef.current) { setLastMsg("Iterador no inicializado — creando uno"); createIterator(); return; }
    iteratorRef.current.reset();
    setCurrent(null);
    setLastMsg("Iterador reiniciado");
  }

  return (
    <Box p="4" style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Iterator: Reproduciendo una playlist</Text>
              <Text size="2" color="gray">Ejemplo simple de un iterador sobre una colección de canciones.</Text>
            </Flex>
            <Badge variant="soft" color="cyan">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "3" }} gap="3" align="end">
            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Título</Text>
              <TextField.Root value={title} onChange={(e: any) => setTitle(e.target.value)} placeholder="Título" />
            </Flex>

            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Artista</Text>
              <TextField.Root value={artist} onChange={(e: any) => setArtist(e.target.value)} placeholder="Artista" />
            </Flex>

            <Flex align="center">
              <Button onClick={addSong} size="3"><PlayIcon /> Agregar</Button>
            </Flex>
          </Grid>
        </Card>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Playlist ({playlist.length})</Text>
            <Separator my="2" />
            {playlist.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {Array.from({ length: playlist.length }).map((_, i) => {
                  const s = playlist.getAt(i);
                  return (
                    <li key={s.id} style={{ marginBottom: 6 }}>
                      {i + 1}. <b>{s.title}</b> · <span style={{ color: "#666" }}>{s.artist}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Text size="2" color="gray">La playlist está vacía</Text>
            )}
          </Card>

          <Card>
            <Text size="3" weight="bold">Iteración</Text>
            <Separator my="2" />
            <Flex gap="2" wrap="wrap">
              <Button onClick={createIterator} size="3"><PlayIcon /> Crear iterador</Button>
              <Button onClick={next} size="3">Siguiente <ChevronRightIcon /></Button>
              <Button onClick={removeCurrent} variant="soft" color="red" size="3"><TrashIcon /> Eliminar</Button>
              <Button onClick={reset} variant="soft" size="3"><StopIcon /> Reiniciar</Button>
            </Flex>

            <div className="mt-3 space-y-2">
              {current ? (
                <div className="rounded-md border p-2 text-sm">
                  Reproduciendo: <b>{current.title}</b> · {current.artist}
                </div>
              ) : (
                <Callout.Root color="gray" variant="soft">
                  <Callout.Text>{lastMsg ?? "Ningún elemento seleccionado"}</Callout.Text>
                </Callout.Root>
              )}
            </div>
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}
