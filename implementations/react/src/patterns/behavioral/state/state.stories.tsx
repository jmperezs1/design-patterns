import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import TicketCardRadix from './component/card';

// Raw sources
import stateInterfaceCode from './state.ts?raw';
import contextCode from './context.ts?raw';
import newStateCode from './new-state.ts?raw';
import progressStateCode from './progress-state.ts?raw';
import closedStateCode from './closed-state.ts?raw';
import taskInterfaceCode from './interfaces/task.ts?raw';
import cardCode from './component/card.tsx?raw';

export default {
	title: 'Design Patterns/Behavioral/State Pattern',
	parameters: {
		docs: {
			description: {
				component:
					'El patrón State permite que un objeto altere su comportamiento cuando su estado interno cambia. Aquí un ticket progresa por estados (New → InProgress → Closed) donde cada estado define qué acciones son válidas en ese momento.'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">State Pattern</h3>
				<Badge variant="soft" color="cyan">Comportamental</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>State</strong> mueve el comportamiento dependiente del estado a clases separadas. El contexto delega en el
				estado actual qué acciones son válidas y cómo se ejecutan, evitando condicionales complejas.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Objetos con múltiples estados suelen acumular <em>ifs</em> para decidir qué hacer según el estado actual. Esto
						complica la lectura y la evolución del código.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Extraer cada estado a su propia clase con las operaciones permitidas. El contexto mantiene una referencia al
						estado y delega la lógica, pudiendo cambiar dinámicamente de estado.
					</p>
				</div>
			</section>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Ticket de soporte</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Un ticket avanza por estados (Nuevo → En progreso → Cerrado). Cada estado permite operaciones distintas.
						Sin State, la lógica se dispersa en condicionales y es difícil de mantener.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						Se definen clases de estado (<code>NewState</code>, <code>InProgressState</code>, <code>ClosedState</code>) y un
						<em>TicketContext</em> que delega sus operaciones. Cambiar de estado cambia el comportamiento válido.
					</p>
				</div>

				{/* UML */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/state.png" alt="State UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
						<figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Context, State y concretos de estado.</figcaption>
					</figure>
				</div>

				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaces e implementaciones</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={stateInterfaceCode} title="state.ts" />
							<CodeBlock code={contextCode} title="context.ts" />
							<CodeBlock code={newStateCode} title="new-state.ts" />
							<CodeBlock code={progressStateCode} title="progress-state.ts" />
							<CodeBlock code={closedStateCode} title="closed-state.ts" />
							<CodeBlock code={taskInterfaceCode} title="interfaces/task.ts" />
							<CodeBlock code={cardCode} title="component/card.tsx" />
						</div>
					</details>
				</div>
			</section>
		</Box>
	);
};
Implementation.parameters = {
	docs: {
		description: {
			story: 'Documentación y código del patrón State. La parte interactiva vive en el Playground.'
		}
	}
};

export const Playground: StoryFn = () => {
	return (
		<div className="space-y-5">
			<div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
				<strong>Cómo interactuar:</strong> En estado "Nuevo", escribe título y tareas y presiona <em>Handle</em> para
				confirmar y pasar a "En progreso". Luego, cada <em>Handle</em> marca la siguiente tarea. Al completar todas,
				<em> Handle</em> valida y cierra el ticket. <em>Reset</em> vuelve a "Nuevo".
			</div>
			<TicketCardRadix />
		</div>
	);
};
Playground.parameters = {
	docs: {
		description: {
			story: 'Playground interactivo: crea un ticket, agrega tareas y observa cómo cambian los estados disponibles automáticamente.'
		}
	}
};
