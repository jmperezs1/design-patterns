// TicketCardRadix.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Separator,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes';
import { TicketContext } from '../context';
import { NewState } from '../new-state';
import { InProgressState } from '../progress-state';
import { ClosedState } from '../closed-state';


export default function TicketCardRadix() {
  const ticket = useMemo(() => new TicketContext(), []);
  const [renderTick, setRenderTick] = useState(0);
  const rerender = () => setRenderTick((x) => x + 1);

  const [titleInput, setTitleInput] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [stagedTasks, setStagedTasks] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isNew = ticket.state instanceof NewState;
  const isInProgress = ticket.state instanceof InProgressState;
  const isClosed = ticket.state instanceof ClosedState;
  const stateName = isNew ? 'Nuevo' : isInProgress ? 'En progreso' : isClosed ? 'Cerrado' : 'Desconocido';

  const handleAddTask = () => {
    const t = taskInput.trim();
    if (!t) return;
    setStagedTasks((prev) => [...prev, t]);
    setTaskInput('');
  };
  const handleRemoveTask = (idx: number) => {
    const next = stagedTasks.slice();
    next.splice(idx, 1);
    setStagedTasks(next);
  };

  const handleRequest = () => {
    setErrorMsg(null);
    try {
      if (isNew) {
        ticket.draftTitle = titleInput;
        ticket.draftTasks = stagedTasks;
      }
      ticket.request();
      if (!isNew) {
        setTitleInput('');
        setTaskInput('');
        setStagedTasks([]);
      }
    } catch (e) {
      setErrorMsg((e as Error).message);
    }
    rerender();
  };

  const handleReset = () => {
    ticket.reset();
    setTitleInput('');
    setTaskInput('');
    setStagedTasks([]);
    setErrorMsg(null);
    rerender();
  };

  const doneCount = ticket.tasks.filter((t) => t.done).length;
  const total = ticket.tasks.length;
  const progress =
    total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const handleLabel = isNew
    ? 'Handle → Confirmar título y tareas'
    : isInProgress
    ? 'Handle → Marcar siguiente tarea'
    : 'Handle → Validar y cerrar ticket';

  return (
    <Box p="4" style={{ maxWidth: 880, margin: '0 auto' }}>
      <Card variant="surface">
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between">
            <Text size="5" weight="bold">Ticket de soporte</Text>
            <Badge variant="soft">{stateName}</Badge>
          </Flex>

          {errorMsg && (
            <Text color="red" size="2">{errorMsg}</Text>
          )}

          {isNew ? (
            <>
              <Text size="2" color="gray">
                Prepara el ticket y presiona <b>Handle</b> para confirmarlo e iniciar.
              </Text>

              <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                <TextField.Root
                  placeholder="Título"
                  value={titleInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
                >
                </TextField.Root>

                <Flex gap="2">
                  <TextField.Root 
                    style={{ flex: 1 }}
                    placeholder="Agregar tarea"
                    value={taskInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskInput(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddTask()}
                  />
                  <Button variant="soft" onClick={handleAddTask}>Agregar</Button>
                </Flex>
              </Grid>

              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell width="60">#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Tarea planificada</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell align="right">Acciones</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {stagedTasks.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={3}>
                        <Text color="gray">Aún no hay tareas</Text>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    stagedTasks.map((t, i) => (
                      <Table.Row key={`${t}-${i}`}>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{t}</Table.Cell>
                        <Table.Cell align="right">
                          <Button
                            variant="soft"
                            color="crimson"
                            onClick={() => handleRemoveTask(i)}
                          >
                            Quitar
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table.Root>
            </>
          ) : (
            <>
              <Flex align="center" justify="between" wrap="wrap" gap="2">
                <Text size="3" weight="bold">{ticket.title}</Text>
                <Text size="2" color="gray">
                  {doneCount}/{total} tareas completadas ({progress}%)
                </Text>
              </Flex>

              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell width="60">#</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Tarea</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell align="center">Hecho</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {ticket.tasks.map((t, i) => (
                    <Table.Row key={t.id}>
                      <Table.Cell>{i + 1}</Table.Cell>
                      <Table.Cell>{t.title}</Table.Cell>
                      <Table.Cell align="center">{t.done ? '✅' : '—'}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>

              {ticket.closedAt && (
                <Text size="2" color="gray">
                  Cerrado: {ticket.closedAt.toLocaleString()}
                </Text>
              )}
            </>
          )}

          <Separator my="2" />

          <Flex gap="2" wrap="wrap">
            <Button onClick={handleRequest}>{handleLabel}</Button>
            <Button variant="soft" onClick={handleReset} disabled={isNew}>
              Reset → Nuevo
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Text size="1" color="gray">Render v{renderTick}</Text>
    </Box>
  );
}
