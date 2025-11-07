"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextField,
  Select,
  Badge,
  Separator,
  Callout,
} from "@radix-ui/themes";
import { Cross1Icon, InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchBox } from "./concrete-colleague-a";
import { ResultsList } from "./concrete-colleague-b";
import { CategoryFilter } from "./concrete-colleague-c";
import { ClearButton } from "./concrete-colleague-d";
import { ConcreteMediator } from "./concrete-mediator";
import type { Item } from "./types/type";

function makeDataset(): Item[] {
  return [
    { id: "1", name: "Patrones de Diseño", category: "books" },
    { id: "2", name: "JavaScript Avanzado", category: "books" },
    { id: "3", name: "Teclado Mecánico", category: "tech" },
    { id: "4", name: "Monitor 4K", category: "tech" },
    { id: "5", name: "Sofá Minimalista", category: "home" },
    { id: "6", name: "Lámpara de Escritorio", category: "home" },
    { id: "7", name: "Aprendiendo React", category: "books" },
    { id: "8", name: "Auriculares Inalámbricos", category: "tech" },
    { id: "9", name: "Alfombra Nórdica", category: "home" },
    { id: "10", name: "Fundamentos de UX", category: "books" },
  ];
}

export default function MediatorDemo() {
  // Colegas
  const A = useMemo(() => new SearchBox(), []);
  const B = useMemo(() => new ResultsList(), []);
  const C = useMemo(() => new CategoryFilter(), []);
  const D = useMemo(() => new ClearButton(), []);

  const [logs, setLogs] = useState<string[]>([]);
  const [dataset] = useState<Item[]>(() => makeDataset());

  // Mediador que coordina
  const mediator = useMemo(() => new ConcreteMediator(
    A,
    B,
    C,
    D,
    dataset,
    (line) => setLogs((l) => [line, ...l])
  ), [A, B, C, D, dataset]);

  // Estado de UI enlazado a los colegas
  const [query, setQuery] = useState(A.value);
  const [category, setCategory] = useState<"all" | Item["category"]>(C.value);

  function onQueryChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    A.operationA(v);
  }

  function onCategoryChange(v: string) {
    const val = v as "all" | Item["category"];
    setCategory(val);
    C.operationC(val);
  }

  function clearAll() {
    D.operationD();
    setQuery(A.value);
    setCategory(C.value);
  }

  // Asegurar render inicial de resultados
  useMemo(() => {
    mediator["notify" as keyof ConcreteMediator]; // access to keep mediator referenced
    C.operationC("all");
    A.operationA("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p="4" style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Mediator: Buscador con Filtro</Text>
              <Text size="2" color="gray">Los componentes no se conocen entre sí; se comunican a través del mediador.</Text>
            </Flex>
            <Badge variant="soft" color="cyan">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "3" }} gap="3" align="end">
            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Buscar</Text>
              <TextField.Root value={query} onChange={onQueryChange} placeholder="Escribe para filtrar" size="3" />
            </Flex>

            <Flex direction="column" gap="1">
              <Text size="2" color="gray">Categoría</Text>
              <Select.Root value={category} onValueChange={onCategoryChange}>
                <Select.Trigger placeholder="Categoría" />
                <Select.Content>
                  <Select.Item value="all">Todas</Select.Item>
                  <Select.Item value="books">Libros</Select.Item>
                  <Select.Item value="tech">Tecnología</Select.Item>
                  <Select.Item value="home">Hogar</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex gap="2" wrap="wrap">
              <Button onClick={clearAll} variant="soft" color="gray" size="3">
                <Cross1Icon /> Limpiar
              </Button>
            </Flex>
          </Grid>

          <Separator my="3" />

          <Flex gap="2" wrap="wrap">
            <Badge variant="soft" color="indigo"><MagnifyingGlassIcon /> {B.view.length} resultados</Badge>
            <Badge variant="soft" color="gray">Categoría: {category === "all" ? "Todas" : category}</Badge>
            <Badge variant="soft" color="gray">Query: {query || "(vacía)"}</Badge>
          </Flex>
        </Card>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Resultados</Text>
            <Separator my="2" />
            {B.view.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {B.view.map((it) => (
                  <li key={it.id}>
                    <Text weight="medium">{it.name}</Text>{" "}
                    <Badge variant="soft" color={it.category === "tech" ? "indigo" : it.category === "books" ? "green" : "orange"}>
                      {it.category}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <Callout.Root color="gray" variant="soft">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>No hay resultados. Ajusta la búsqueda o cambia la categoría.</Callout.Text>
              </Callout.Root>
            )}
          </Card>

          <Card>
            <Text size="3" weight="bold">Registro del Mediador</Text>
            <Separator my="2" />
            {logs.length ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {logs.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            ) : (
              <Text size="2" color="gray">Interactúa con los controles para ver eventos.</Text>
            )}
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}
