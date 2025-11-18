import type { CodeSnippet } from '../../../registry/types';

export const interpreterCodeSnippets: CodeSnippet[] = [
  { title: 'interpreter.ts', language: 'ts', code: `export interface Expression { interpret(): number; }` },
  { title: 'parser.ts', language: 'ts', code: `import type { Expression } from './interpreter';\nimport { NumberExpression } from './terminal-expression';\nimport { AdditionExpression } from './non_terminal_add';\nimport { MultiplicationExpression } from './non_terminal_mul';\n\n// (tokenize + shunting-yard) + build AST\n// Simplified para el snippet, ver archivo completo para más detalles.\n` },
  { title: 'non_terminal_add.tsx', language: 'tsx', code: `import type { Expression } from './interpreter';\nexport class AdditionExpression implements Expression {\n  private readonly left: Expression; private readonly right: Expression;\n  constructor(left: Expression, right: Expression) { this.left = left; this.right = right; }\n  interpret(): number { return this.left.interpret() + this.right.interpret(); }\n}` },
];
