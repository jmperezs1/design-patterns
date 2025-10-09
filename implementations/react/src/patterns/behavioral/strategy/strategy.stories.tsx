import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { PricingCatalog } from './components/pricing-catalog';

// Raw sources
import strategyInterfaceCode from './strategy-interface.ts?raw';
import standardCode from './standard-client-strategy.ts?raw';
import goldCode from './gold-client-strategy.ts?raw';
import platinumCode from './platinum-client-strategy.ts?raw';
import vipCode from './vip-client-strategy.ts?raw';
import pricingCatalogComponentCode from './components/pricing-catalog.tsx?raw';
import pricingContextCode from './pricing-context.ts?raw';
import helpersCode from './helpers/helpers.ts?raw';
import typesCode from './types/client.ts?raw';
import productsCode from './data/products.ts?raw';

export default {
  title: 'Design Patterns/Behavioral/Strategy Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'El patrón Strategy encapsula algoritmos intercambiables detrás de una interfaz común. Aquí cada estrategia aplica reglas de precio distintas y el cliente sólo habla con el contexto.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Strategy Pattern</h3>
				<Badge variant="soft" color="cyan">Comportamental</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>Strategy</strong> permite elegir y cambiar algoritmos en tiempo de ejecución a través de una interfaz común.
				El cliente utiliza un <em>Context</em> que delega el cálculo a la estrategia activa.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Si el precio depende de muchas reglas, un <em>if-else/switch</em> gigante hace difícil extender o probar
						variantes. Cambiar de regla implica tocar el mismo bloque de código.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Definir una interfaz <code>Strategy</code> y múltiples implementaciones. Un <em>Context</em> mantiene una referencia
						a la estrategia y permite reemplazarla sin afectar al resto del sistema.
					</p>
				</div>
			</section>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Catálogo con estrategias de precio</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Distintos tipos de cliente (standard, gold, platinum, VIP) requieren reglas de descuento diferentes.
						Queremos alternarlas sin duplicar el catálogo ni llenar de condicionales la UI.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						El <em>PricingContext</em> delega el cálculo a la estrategia activa. Cambiar el tipo de cliente cambia la
						estrategia en tiempo real; el catálogo no se modifica.
					</p>
				</div>

				{/* UML */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/strategy.png" alt="Strategy UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
						<figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Context, Strategy e implementaciones.</figcaption>
					</figure>
				</div>

				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaz, estrategias y contexto</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={strategyInterfaceCode} title="strategy-interface.ts" />
							<CodeBlock code={standardCode} title="standard-client-strategy.ts" />
							<CodeBlock code={goldCode} title="gold-client-strategy.ts" />
							<CodeBlock code={platinumCode} title="platinum-client-strategy.ts" />
							<CodeBlock code={vipCode} title="vip-client-strategy.ts" />
							<CodeBlock code={pricingContextCode} title="pricing-context.ts" />
							<CodeBlock code={helpersCode} title="helpers/helpers.ts" />
							<CodeBlock code={typesCode} title="types/client.ts" />
							<CodeBlock code={productsCode} title="data/products.ts" />
							<CodeBlock code={pricingCatalogComponentCode} title="components/pricing-catalog.tsx" />
						</div>
					</details>
				</div>
			</section>
		</Box>
	);
};

/* ================= Playground Story ================= */
export const Playground: StoryFn = () => {
	return (
		<div className="space-y-5">
			<div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
				<strong>Cómo interactuar:</strong> Cambia el tipo de cliente para alternar la estrategia de precio. Ajusta la cantidad
				y observa el precio unitario y el total calculados por el contexto.
			</div>
			<PricingCatalog />
		</div>
	);
};

Playground.parameters = {
  docs: {
    description: {
			story: 'Interactúa con el catálogo: cada cambio de tipo de cliente reemplaza la estrategia en tiempo de ejecución.'
    }
  }
};

