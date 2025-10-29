import type { CodeSnippet } from '../../../registry/types';

export const adapterCodeSnippets: CodeSnippet[] = [
  { title: 'adaptee.ts', language: 'ts', code: `export class Adaptee {\n  async specificRequest(): Promise<string> {\n    // Simula una API que devuelve CSV\n    return 'id,name,email\\n1,Juan Perez,juanperez@example.com\\n2,Mario,mario@example.com\\n3,Camila,camila@example.com';\n  }\n}` },
  { title: 'adapter.ts', language: 'ts', code: `import type { Adaptee } from './adaptee';\nimport type { User } from './interfaces/user';\nimport type { Target } from './target';\n\nexport class Adapter implements Target {\n  private adaptee: Adaptee;\n  constructor(adaptee: Adaptee) { this.adaptee = adaptee; }\n\n  async request(): Promise<User[]> {\n    const csv = await this.adaptee.specificRequest();\n    const lines = csv.trim().split(/\r?\n/);\n    const rows = lines.slice(1).filter(Boolean);\n    return rows.map((row) => {\n      const [id, name, email] = row.split(',');\n      return { id: Number(id), name: (name ?? '').trim(), email: (email ?? '').trim() };\n    });\n  }\n}` },
  { title: 'target.ts', language: 'ts', code: `import type { User } from './interfaces/user';\n\nexport interface Target {\n  request(): Promise<User[]>;\n}` },
  { title: 'interfaces/user.ts', language: 'ts', code: `export type User = { id: number; name: string; email: string };` },
  // Removed client.tsx snippet to avoid template interpolation issues
];
