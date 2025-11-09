import type { Expression } from './interpreter';
import { NumberExpression } from './terminal-expression';
import { AdditionExpression } from './non_terminal_add';
import { MultiplicationExpression } from './non_terminal_mul';

type Tok = { type: 'num'; value: number } | { type: 'op'; value: '+' | '*' } | { type: 'par'; value: '(' | ')' };

export function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === ' ') { i++; continue; }
    if (c === '+' || c === '*') { out.push({ type: 'op', value: c }); i++; continue; }
    if (c === '(' || c === ')') { out.push({ type: 'par', value: c }); i++; continue; }
    if (/\d/.test(c)) {
      let j = i; while (j < src.length && /\d/.test(src[j])) j++;
      out.push({ type: 'num', value: Number(src.slice(i, j)) });
      i = j; continue;
    }
    throw new Error(`Token inválido en posición ${i + 1}: '${c}'`);
  }
  return out;
}

function precedence(op: '+' | '*') { return op === '+' ? 1 : 2; }

export function parseToExpression(src: string): { expr: Expression; rpn: string } {
  const tokens = tokenize(src);
  const output: (Tok & { type: 'num' | 'op' })[] = [];
  const ops: ('+' | '*' | '(')[] = [];
  for (const t of tokens) {
    if (t.type === 'num') output.push(t as any);
    else if (t.type === 'op') {
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top === '(') break;
        if (precedence(top as any) >= precedence(t.value)) {
          output.push({ type: 'op', value: ops.pop() as any });
        } else break;
      }
      ops.push(t.value);
    } else if (t.type === 'par' && t.value === '(') ops.push('(');
    else if (t.type === 'par' && t.value === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') {
        output.push({ type: 'op', value: ops.pop() as any });
      }
      if (!ops.length) throw new Error('Paréntesis desbalanceados');
      ops.pop();
    }
  }
  while (ops.length) {
    const o = ops.pop()!;
    if (o === '(') throw new Error('Paréntesis desbalanceados');
    output.push({ type: 'op', value: o as any });
  }
  // build AST from RPN
  const stack: Expression[] = [];
  for (const t of output) {
    if (t.type === 'num') stack.push(new NumberExpression(t.value));
    else {
      const b = stack.pop();
      const a = stack.pop();
      if (!a || !b) throw new Error('Expresión inválida');
      if (t.value === '+') stack.push(new AdditionExpression(a, b));
      else stack.push(new MultiplicationExpression(a, b));
    }
  }
  if (stack.length !== 1) throw new Error('Expresión inválida');
  return { expr: stack[0], rpn: output.map(t => t.type === 'num' ? String(t.value) : t.value).join(' ') };
}
