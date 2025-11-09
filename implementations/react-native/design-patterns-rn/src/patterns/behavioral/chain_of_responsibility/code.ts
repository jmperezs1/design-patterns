export const chainCodeSnippets = [
  {
    title: 'handler.ts',
    code: `export interface Handler { setNext(h: Handler): Handler; handle(req: Ticket, trail?: string[]): HandleResult; }`,
    language: 'typescript',
  },
  {
    title: 'base_handler.ts',
    code: `export abstract class SupportHandler implements Handler { protected next?: Handler; setNext(h: Handler) { this.next = h; return h; } /* ... */ }`,
    language: 'typescript',
  },
  {
    title: 'soporte_nivel_1.ts',
    code: `class SoporteNivel1 extends SupportHandler { handle(req, trail=[]) { this.push(trail); if (rank[req.severity] <= rank['medium']) return { handledBy: 'SoporteNivel1', message: 'Atendido', trail }; return super.handle(req, trail); } }`,
    language: 'typescript',
  }
];
