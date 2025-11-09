"use client";

import { useMemo, useState } from "react";
import { Box, Button, Card, Flex, Grid, Text, TextField, Separator, Badge, Callout } from "@radix-ui/themes";
import { InfoCircledIcon, MagicWandIcon, ReloadIcon } from "@radix-ui/react-icons";
import type { Expression } from "./interpreter";
import { NumberExpression } from "./terminal-expression";
import { AdditionExpression } from "./non-terminal-expression-a";
import { MultiplicationExpression } from "./non-terminal-expression-b";

type Tok = { type: "num"; value: number } | { type: "op"; value: "+" | "*" } | { type: "par"; value: "(" | ")" };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === " ") { i++; continue; }
    if (c === "+" || c === "*") { out.push({ type: "op", value: c }); i++; continue; }
    if (c === "(" || c === ")") { out.push({ type: "par", value: c }); i++; continue; }
    if (/\d/.test(c)) {
      let j = i; while (j < src.length && /\d/.test(src[j])) j++;
      out.push({ type: "num", value: Number(src.slice(i, j)) });
      i = j; continue;
    }
    throw new Error(`Token inválido en posición ${i + 1}: '${c}'`);
  }
  return out;
}

function precedence(op: "+" | "*") { return op === "+" ? 1 : 2; }

// Shunting-yard → RPN → construir AST (Expression)
function parseToExpression(src: string): { expr: Expression; rpn: string } {
  const tokens = tokenize(src);
  const output: (Tok & { type: "num" | "op" })[] = [];
  const ops: ("+" | "*" | "(" )[] = [];
  for (const t of tokens) {
    if (t.type === "num") output.push(t);
    else if (t.type === "op") {
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top === "(" ) break;
        if (precedence(top as any) >= precedence(t.value)) {
          output.push({ type: "op", value: ops.pop() as any });
        } else break;
      }
      ops.push(t.value);
    } else if (t.type === "par" && t.value === "(") ops.push("(");
    else if (t.type === "par" && t.value === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") {
        output.push({ type: "op", value: ops.pop() as any });
      }
      if (!ops.length) throw new Error("Paréntesis desbalanceados");
      ops.pop(); // remove (
    }
  }
  while (ops.length) {
    const o = ops.pop()!;
    if (o === "(") throw new Error("Paréntesis desbalanceados");
    output.push({ type: "op", value: o as any });
  }
  // build AST from RPN
  const stack: Expression[] = [];
  for (const t of output) {
    if (t.type === "num") stack.push(new NumberExpression(t.value));
    else {
      const b = stack.pop();
      const a = stack.pop();
      if (!a || !b) throw new Error("Expresión inválida");
      if (t.value === "+") stack.push(new AdditionExpression(a, b));
      else stack.push(new MultiplicationExpression(a, b));
    }
  }
  if (stack.length !== 1) throw new Error("Expresión inválida");
  return { expr: stack[0], rpn: output.map(t => t.type === "num" ? String(t.value) : t.value).join(" ") };
}

export default function InterpreterDemo() {
  const [input, setInput] = useState("3 + 5 * 2");
  const [rpn, setRpn] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const examples = useMemo(() => [
    "3 + 5 * 2",
    "(3 + 5) * 2",
    "8 * (2 + 2) + 1",
    "10 + 2 * (3 + 7)"
  ], []);

  function evalNow() {
    try {
      setError(null);
      const { expr, rpn } = parseToExpression(input);
      setRpn(rpn);
      setResult(expr.interpret());
    } catch (e: any) {
      setResult(null);
      setRpn("");
      setError(e?.message ?? String(e));
    }
  }

  function setExample(s: string) {
    setInput(s);
    setRpn("");
    setResult(null);
    setError(null);
  }

  return (
    <Box p="4" style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        <Card variant="surface">
          <Flex align="center" justify="between" wrap="wrap" gap="3">
            <Flex direction="column" gap="1">
              <Text size="5" weight="bold">Interpreter: Mini calculadora aritmética</Text>
              <Text size="2" color="gray">Construye un AST (suma y multiplicación) y evalúa con <em>interpret()</em>.</Text>
            </Flex>
            <Badge variant="soft" color="cyan">Comportamental</Badge>
          </Flex>

          <Separator my="3" size="4" />

          <Grid columns={{ initial: "1", md: "3" }} gap="3" align="end">
            <Flex direction="column" gap="1" className="md:col-span-2">
              <Text size="2" color="gray">Expresión</Text>
              <TextField.Root value={input} onChange={(e: any) => setInput(e.target.value)} placeholder="3 + 5 * 2" />
            </Flex>
            <Flex align="center" gap="2" wrap="wrap">
              <Button onClick={evalNow} size="3"><MagicWandIcon /> Evaluar</Button>
              <Button variant="soft" onClick={() => setInput("")}>Limpiar</Button>
            </Flex>
          </Grid>
        </Card>

        <Grid columns={{ initial: "1", md: "2" }} gap="3">
          <Card>
            <Text size="3" weight="bold">Resultado</Text>
            <Separator my="2" />
            {error ? (
              <Callout.Root color="red" variant="soft">
                <Callout.Icon><InfoCircledIcon /></Callout.Icon>
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            ) : result !== null ? (
              <div className="rounded-md border p-2 text-lg">
                {result}
              </div>
            ) : (
              <Text size="2" color="gray">Evalúa una expresión para ver el resultado</Text>
            )}
            {rpn && (
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                RPN: <code>{rpn}</code>
              </div>
            )}
          </Card>

          <Card>
            <Text size="3" weight="bold">Ejemplos</Text>
            <Separator my="2" />
            <Flex gap="2" wrap="wrap">
              {examples.map((ex, i) => (
                <Button key={i} variant="soft" onClick={() => setExample(ex)}><ReloadIcon /> {ex}</Button>
              ))}
            </Flex>
            <Callout.Root color="gray" variant="soft" style={{ marginTop: 12 }}>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>Soporta dígitos, suma (+), multiplicación (*) y paréntesis. Precedencia: * sobre +.</Callout.Text>
            </Callout.Root>
          </Card>
        </Grid>
      </Flex>
    </Box>
  );
}
