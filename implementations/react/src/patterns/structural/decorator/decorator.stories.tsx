import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import BurgerClientRadix from './client';

// Raw sources
import componentCode from './interface-component.ts?raw';
import concreteComponentCode from './concrete-component.ts?raw';
import decoratorInterfaceCode from './interface-decorator.ts?raw';
import cheeseDecoratorCode from './concrete-cheese-decorator.ts?raw';
import baconDecoratorCode from './concrete-bacon-decorator.ts?raw';
import doubleDecoratorCode from './concrete-double-decorator.ts?raw';
import addOnConstCode from './constants/add-on.ts?raw';
import addOnTypeCode from './types/add-on.ts?raw';
import clientCode from './client.tsx?raw';

export default {
	title: 'Design Patterns/Structural/Decorator Pattern',
	parameters: {
		docs: {
			description: {
				component:
					'Decorator añade responsabilidades a un objeto de forma dinámica sin modificar su clase. Cada “add-on” envuelve (decora) al componente base y extiende su comportamiento (descripción/costo).'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Decorator Pattern</h3>
				<Badge variant="soft" color="cyan">Estructural</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>Decorator</strong> permite componer funcionalidades envolviendo un objeto con capas adicionales. Cada capa respeta la misma interfaz, por lo que el cliente puede tratarlas uniformemente.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Extender comportamiento con herencia genera explosión de subclases y combinaciones rígidas. Queremos añadir/quitar responsabilidades en tiempo de ejecución, sin tocar la clase base.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Definir una interfaz común y un decorador que envuelva a un componente concreto. Cada decorador delega en el envuelto y añade comportamiento (antes/después), pudiendo encadenarse en cualquier orden.
					</p>
				</div>
			</section>

			<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/real_decorator.png" alt="Decorator UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
        	</div>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Hamburguesa con add-ons</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						La base “Hamburguesa” puede adornarse con queso, tocineta o carne extra. Cada combinación debe modificar descripción y precio sin crear clases por cada mezcla.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						<code>PlainBurger</code> implementa la interfaz. Los decoradores <code>Cheese</code>, <code>Bacon</code> y <code>DoublePatty</code> envuelven al anterior en la cadena, ajustando la descripción y sumando al costo.
					</p>
				</div>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/decorator.png" alt="Decorator UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
        		</div>

				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaz, decoradores y cliente</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={componentCode} title="interface-component.ts" />
							<CodeBlock code={concreteComponentCode} title="concrete-component.ts" />
							<CodeBlock code={decoratorInterfaceCode} title="interface-decorator.ts" />
							<CodeBlock code={cheeseDecoratorCode} title="concrete-cheese-decorator.ts" />
							<CodeBlock code={baconDecoratorCode} title="concrete-bacon-decorator.ts" />
							<CodeBlock code={doubleDecoratorCode} title="concrete-double-decorator.ts" />
							<CodeBlock code={addOnConstCode} title="constants/add-on.ts" />
							<CodeBlock code={addOnTypeCode} title="types/add-on.ts" />
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
				<strong>Cómo interactuar:</strong> Marca/desmarca add-ons para ver cómo los decoradores ajustan la descripción y el precio. El orden de selección afecta el desglose de deltas.
			</div>
			<BurgerClientRadix />
		</div>
	);
};

Playground.parameters = {
	docs: {
		description: {
			story: 'Cada add-on es un decorador que envuelve a la hamburguesa base y suma su propio costo. El cliente no necesita conocer combinaciones, sólo compone.'
		}
	}
};

