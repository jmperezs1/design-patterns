import type { CodeSnippet } from '../../../registry/types';

export const decoratorCodeSnippets: CodeSnippet[] = [
  { title: 'interface-component.ts', language: 'ts', code: `export interface Burger {\n  getDescription(): string;\n  getCost(): number;\n}\n\nexport class PlainBurger implements Burger {\n  getDescription() { return 'Hamburguesa'; }\n  getCost() { return 4.5; }\n}` },
  { title: 'interface-decorator.ts', language: 'ts', code: `import type { Burger } from './interface-component';\n\nexport abstract class BurgerDecorator implements Burger {\n  protected readonly wrappee: Burger;\n  constructor(burger: Burger) { this.wrappee = burger; }\n\n  getDescription() { return this.wrappee.getDescription(); }\n  getCost() { return this.wrappee.getCost(); }\n}` },
  { title: 'concrete-cheese-decorator.ts', language: 'ts', code: `import { BurgerDecorator } from './interface-decorator';\n\nexport class Cheese extends BurgerDecorator {\n  getDescription() { return \`${'${'}this.wrappee.getDescription()} + queso\`; }\n  getCost() { return this.wrappee.getCost() + 0.75; }\n}` },
  { title: 'concrete-bacon-decorator.ts', language: 'ts', code: `import { BurgerDecorator } from './interface-decorator';\n\nexport class Bacon extends BurgerDecorator {\n  getDescription() { return \`${'${'}this.wrappee.getDescription()} + tocineta\`; }\n  getCost() { return this.wrappee.getCost() + 1.10; }\n}` },
];
