import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
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

export const Implementation: StoryFn = () => (
	<div className="space-y-4">
		<h3 className="text-lg font-semibold mb-2">State Pattern</h3>
		<p className="text-sm text-gray-600 text-justify">
			Este ejemplo muestra cómo <strong>State</strong> encapsula el comportamiento específico de cada estado en clases separadas. Un <code>TicketContext</code> mantiene una referencia al estado actual (<code>NewState</code>, <code>InProgressState</code>, <code>ClosedState</code>) y delega las operaciones a él. Cada estado define qué transiciones son válidas: desde <em>New</em> se puede crear el ticket, desde <em>InProgress</em> se completan tareas, y <em>Closed</em> valida el cierre. Esto elimina condicionales complejas y hace que agregar nuevos estados sea sencillo.
		</p>
		<details className="rounded-lg border bg-white p-3 open:pb-3">
			<summary className="cursor-pointer select-none text-sm font-medium">Ver código fuente</summary>
			<div className="mt-3 space-y-3">
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
);
Implementation.parameters = {
	docs: {
		description: {
			story: 'Documentación y código del patrón State. La parte interactiva vive en el Playground.'
		}
	}
};

export const Playground: StoryFn = () => <TicketCardRadix />;
Playground.parameters = {
	docs: {
		description: {
			story: 'Playground interactivo: crea un ticket, agrega tareas y observa cómo cambian los estados disponibles automáticamente.'
		}
	}
};
