import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import InterpreterDemo from './client';

// Raw code
import iface from './interpreter.ts?raw';
import terminal from './terminal-expression.ts?raw';
import nonTermA from './non-terminal-expression-a.ts?raw';
import nonTermB from './non-terminal-expression-b.ts?raw';
import types from './types/type.ts?raw';
import clientCode from './client.tsx?raw';

export default {
  title: 'Design Patterns/Behavioral/Interpreter Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'Interpreter define una gramática simple y utiliza un árbol de expresiones para evaluar sentencias en esa gramática. Útil cuando una gramática es estable y se evalúa con frecuencia.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => (
  <Box className="space-y-8" p="3">
    {/* Header */}
    <Flex align="center" gap="3" className="flex-wrap">
      <h3 className="text-2xl font-semibold tracking-tight">Interpreter Pattern</h3>
      <Badge variant="soft" color="cyan">Comportamental</Badge>
    </Flex>

    {/* Resumen */}
    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <strong>Interpreter</strong> modela reglas como una combinación de expresiones (terminales y no terminales). Evaluar la sentencia es recorrer el árbol llamando <code>interpret()</code>.
    </p>

    <Separator size="4" />

    {/* Problemática / Solución General */}
  <section className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
        <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          Cuando la lógica depende de reglas o una gramática que cambia poco, codificar validaciones con condicionales se vuelve repetitivo y difícil de extender.
        </p>
      </div>
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
        <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
          Definir una jerarquía de <em>Expresiones</em> para cada construcción de la gramática. Cada nodo sabe cómo interpretarse y combinarse con otros, permitiendo construir y evaluar árboles de forma declarativa.
        </p>
      </div>
    </section>


    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/real_interpreter.png" alt="Interpreter UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
				</div>


    {/* Código Fuente */}
    <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
      <header className="flex items-center gap-3 flex-wrap">
        <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Aritmética (+, *)</h4>
        <Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
      </header>

      {/* Problemática / Solución Específica */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Necesitamos evaluar expresiones aritméticas simples con suma y multiplicación respetando precedencia y paréntesis. Implementar esto con condicionales ad-hoc genera código frágil y difícil de extender a nuevas operaciones.
          </p>
        </div>
        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            Modelamos cada construcción como una expresión: <code>NumberExpression</code>, <code>AddExpression</code>, <code>MultiplyExpression</code>. Parseamos y construimos un árbol. Evaluar implica recorrer el árbol llamando <code>interpret()</code> en cada nodo, facilitando agregar más operadores.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/interpreter.png" alt="Interpreter UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
						<figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Invoker, Command(s) e Receiver desacoplados.</figcaption>
					</figure>
				</div>

      {/* Código Fuente */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
        <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
        <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
          <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces y expresiones</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
            <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
          </summary>
          <div className="p-4 space-y-4">
            <CodeBlock code={iface} title="interpreter.ts" />
            <CodeBlock code={terminal} title="terminal-expression.ts" />
            <CodeBlock code={nonTermA} title="non-terminal-expression-a.ts" />
            <CodeBlock code={nonTermB} title="non-terminal-expression-b.ts" />
            <CodeBlock code={types} title="types/type.ts" />
            <CodeBlock code={clientCode} title="client.tsx" />
          </div>
        </details>
      </div>
    </section>
  </Box>
);

Implementation.parameters = {
  docs: {
    description: {
      story: 'Documentación y código del patrón Interpreter. La parte interactiva vive en el Playground.'
    }
  }
};

export const Playground: StoryFn = () => (
  <div className="space-y-5">
    <div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
      <strong>Cómo interactuar:</strong> Escribe una expresión usando dígitos, <code>+</code>, <code>*</code> y paréntesis. Presiona "Evaluar" para construir el árbol y calcular el resultado (precedencia: * sobre +).
    </div>
    <InterpreterDemo />
  </div>
);

Playground.parameters = {
  docs: {
    description: {
      story: 'Playground interactivo: el parser convierte tu entrada a RPN y luego construye el árbol de expresiones (Number, Addition, Multiplication) para evaluarlo.'
    }
  }
};
