import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
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
					'El patrón Command encapsula una petición como un objeto. Aquí cada acción (agregar, remover, limpiar) se modela como un comando independiente que implementa la interfaz común Command. Un Invoker orquesta qué comando ejecutar y un Receiver mantiene el estado de los ítems.'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => (
	<div className="space-y-4">
		<h3 className="text-lg font-semibold mb-2">Command Pattern</h3>
		<p className="text-sm text-gray-600 text-justify">
			Este ejemplo muestra cómo <strong>Command</strong> desacopla el emisor de una acción de la lógica que la ejecuta. Cada operación (<code>AddItemCommand</code>, <code>RemoveItemCommand</code>, <code>ClearItemsCommand</code>) implementa la interfaz <code>Command</code>. El <em>Invoker</em> selecciona dinámicamente qué comando ejecutar y el <em>Receiver</em> concentra el estado (un pequeño inventario). Esto habilita: <em>reusabilidad</em>, posible <em>undo/redo</em>, colas o macro comandos sin cambiar la UI.</p>
		<details className="rounded-lg border bg-white p-3 open:pb-3">
			<summary className="cursor-pointer select-none text-sm font-medium">Ver código fuente</summary>
			<div className="mt-3 space-y-3">
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
);
Implementation.parameters = {
	docs: {
		description: {
			story: 'Documentación y código del patrón Command. La parte interactiva vive en el Playground.'
		}
	}
};

export const Playground: StoryFn = () => <CommandListRadix />;
Playground.parameters = {
	docs: {
		description: {
			story: 'Playground interactivo: ejecuta comandos agregando, quitando o limpiando ítems.'
		}
	}
};

