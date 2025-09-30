'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Target } from './target';
import type { User } from './interfaces/user';

import {
  Box,
  Button,
  Flex,
  Separator,
  Table,
  Text,
  TextField,
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type Props = { api: Target; pageSize?: number };

export function ClientTableRadix({ api, pageSize = 10 }: Props) {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<Error | null>(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    api
      .request()
      .then((data) => !cancel && setRows(data))
      .catch((e) => !cancel && setErr(e as Error))
      .finally(() => !cancel && setLoading(false));
    return () => {
      cancel = true;
    };
  }, [api]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (u) =>
        String(u.id).includes(s) ||
        u.name?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s),
    );
  }, [rows, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [filtered, pageSafe, pageSize],
  );

  return (
    <Box p="3" className="rounded-2xl border">
      <Flex align="center" gap="4" wrap="wrap" mb="4">
        <TextField.Root
          aria-label="Search users"
          className="max-w-[340px]"
          placeholder="Search id, name, email…"
          size="2"
            /* surface: subtle background; could use 'soft' for more emphasis */
          variant="surface"
          radius="large"
          value={q}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQ(e.target.value);
            setPage(1);
          }}
        >
          <TextField.Slot side="left">
            <MagnifyingGlassIcon />
          </TextField.Slot>
        </TextField.Root>

        <Text size="2" color="gray">
          {loading ? 'Loading…' : `${filtered.length} result(s)`}
        </Text>

  <Flex ml="auto" align="center" gap="3">
          <Button
            variant="soft"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pageSafe === 1 || loading}
          >
            <ChevronLeftIcon />
            Prev
          </Button>
          <Text size="2">
            Page {pageSafe} / {totalPages}
          </Text>
          <Button
            variant="soft"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={pageSafe === totalPages || loading}
          >
            Next
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Flex>

      <Separator size="4" my="2" />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell style={{ width: 120 }}>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Table.Row key={i}>
                  <Table.Cell>—</Table.Cell>
                  <Table.Cell>Loading…</Table.Cell>
                  <Table.Cell>Loading…</Table.Cell>
                </Table.Row>
              ))
            : pageRows.map((u) => (
                <Table.Row key={u.id}>
                  <Table.Cell>{u.id}</Table.Cell>
                  <Table.Cell style={{ fontWeight: 500 }}>{u.name}</Table.Cell>
                  <Table.Cell>{u.email}</Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>

      {!loading && pageRows.length === 0 && (
        <Flex justify="center" py="5">
          <Text color="gray">No results</Text>
        </Flex>
      )}

      {error && (
        <Box mt="3">
          <Text color="red">Error: {error.message}</Text>
        </Box>
      )}
    </Box>
  );
}
