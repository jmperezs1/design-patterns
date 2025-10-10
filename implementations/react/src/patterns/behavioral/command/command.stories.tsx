import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import CommandListRadix from './client';

// Raw sources
import commandInterfaceCode from './command-interface.ts?raw';
import receiverCode from './receiver.ts?raw';
import invokerCode from './invoker.ts?raw';
import addCmdCode from './add-item-command.ts?raw';
import removeCmdCode from './remove-item-command.ts?raw';
import clearCmdCode from './clear-item-command.ts?raw';
import clientCode from './client.tsx?raw';

export default {
	title: 'Design Patterns/Behavioral/Command Pattern',
	parameters: {
		docs: {
			description: {
				component:
					'El patrón Command encapsula una petición como un objeto. Cada acción (agregar, remover, limpiar) se modela como un comando que implementa una interfaz común y puede ser orquestado por un Invoker. Así se desacopla la UI de la lógica, habilitando undo/redo, colas o macros.',
			},
		},
	},
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Command Pattern</h3>
				<Badge variant="soft" color="cyan">Comportamental</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>Command</strong> encapsula una operación (una acción) dentro de un objeto independiente, permitiendo ejecutar, deshacer o almacenar comandos sin que el invocador conozca los detalles de cómo se realiza la acción.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Cuando se quiere ejecutar acciones de forma desacoplada —por ejemplo, programarlas, ponerlas en cola, deshacerlas (undo), o registrar historial— pero el código que invoca la acción está directamente conectado a la implementación concreta, lo que impide flexibilidad o control sobre esas operaciones.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Convertir cada acción en un “comando” con una interfaz común (execute, opcionalmente undo), permitiendo que el invocador reciba y ejecute comandos sin conocer cómo están implementados, facilitando su almacenamiento, combinación o reversión
					</p>
				</div>
			</section>

			<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/real_command.png" alt="Command UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
				</div>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Lista de ítems</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Administrar un pequeño inventario desde la UI (agregar, quitar, limpiar) puede acoplar botones a lógica de
						estado. Queremos reusar y combinar acciones de forma flexible.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						Se definen comandos <code>AddItemCommand</code>, <code>RemoveItemCommand</code>, <code>ClearItemsCommand</code> que actúan
						sobre un <em>Receiver</em> (estado del inventario). Un <em>Invoker</em> decide cuál ejecutar.
					</p>
				</div>

				{/* UML */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/command.png" alt="Command UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
						<figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Invoker, Command(s) e Receiver desacoplados.</figcaption>
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
							<CodeBlock code={commandInterfaceCode} title="command-interface.ts" />
							<CodeBlock code={receiverCode} title="receiver.ts" />
							<CodeBlock code={invokerCode} title="invoker.ts" />
							<CodeBlock code={addCmdCode} title="add-item-command.ts" />
							<CodeBlock code={removeCmdCode} title="remove-item-command.ts" />
							<CodeBlock code={clearCmdCode} title="clear-item-command.ts" />
							<CodeBlock code={clientCode} title="client.tsx" />
						</div>
					</details>
				</div>
			</section>
		</Box>
	);
};

export const Playground: StoryFn = () => {
	return (
		<div className="space-y-5">
			<div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
				<strong>Cómo interactuar:</strong> Usa los botones para agregar ítems del catálogo, quita con “-” o limpia todo. El Invoker
				selecciona el Command y el Receiver mantiene el estado.
			</div>
			<CommandListRadix />
		</div>
	);
};

