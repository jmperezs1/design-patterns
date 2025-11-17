import type { Meta, StoryFn } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import { JsonTreeRadix } from './client';

// Raw sources
import componentCode from './component.ts?raw';
import leafCode from './leaf.ts?raw';
import objectCompositeCode from './object-composite.ts?raw';
import arrayCompositeCode from './array-composite.ts?raw';
import nodeBuilderCode from './helpers/node-builder.ts?raw';
import jsonTypeCode from './types/json.ts?raw';
import clientCode from './client.tsx?raw';

export default {
	title: 'Design Patterns/Structural/Composite Pattern',
	parameters: {
		docs: {
			description: {
				component:
					'Composite compone objetos en estructuras de árbol para tratar elementos individuales y compuestos de forma uniforme. Aquí lo usamos para recorrer y renderizar JSON como un árbol interactivo.'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Composite Pattern</h3>
				<Badge variant="soft" color="cyan">Estructural</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>Composite</strong> permite tratar objetos individuales (hojas) y contenedores (composites) con la misma interfaz, facilitando operar recursivamente sobre árboles.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Cuando se quiere recorrer o manipular estructuras jerárquicas (por ejemplo, JSON anidado o sistemas de archivos), el código suele llenarse de condicionales para distinguir elementos simples de contenedores.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Definir una interfaz común para hojas y compuestos. Los compuestos almacenan hijos y delegan operaciones uniﬁcadas (<em>getChildren</em>, <em>getPreview</em>) permitiendo recorrer la estructura de forma uniforme.
					</p>
				</div>
			</section>

			<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
				<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
				<figure>
					<img src="/img/real_composite.png" alt="Composite UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
				</figure>
        	</div>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Árbol de JSON</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Mostrar y navegar un JSON arbitrario requiere distinguir objetos, arreglos y valores primitivos. Queremos renderizarlo con un único componente recursivo.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						Implementamos <code>JsonComponent</code> como interfaz común. <code>PrimitiveNode</code> es hoja; <code>ObjectNode</code> y <code>ArrayNode</code> son compuestos. Un <em>nodeBuilder</em> decide qué crear y un componente <code>JsonTreeRadix</code> recorre y dibuja el árbol.
					</p>
				</div>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
					<figure>
						<img src="/img/composite.png" alt="Composite UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
					</figure>
        		</div>


				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaz, componentes y cliente</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={componentCode} title="component.ts" />
							<CodeBlock code={leafCode} title="leaf.ts" />
							<CodeBlock code={objectCompositeCode} title="object-composite.ts" />
							<CodeBlock code={arrayCompositeCode} title="array-composite.ts" />
							<CodeBlock code={nodeBuilderCode} title="helpers/node-builder.ts" />
							<CodeBlock code={jsonTypeCode} title="types/json.ts" />
							<CodeBlock code={clientCode} title="client.tsx" />
						</div>
					</details>
				</div>
			</section>
		</Box>
	);
};

/* ================= Playground Story ================= */
export const Playground: StoryFn = () => {
	const sample = {
		id: 'ord_123',
		customer: { id: 'cus_9a', name: 'Ada Lovelace', vip: true },
		items: [
			{ sku: 'A001', name: 'Keyboard', qty: 1, price: 59.99 },
			{ sku: 'B310', name: 'Mouse', qty: 2, price: 19.5 },
			{ sku: 'C777', name: 'USB-C hub', qty: 1, price: 32 },
		],
		notes: null,
		meta: { source: 'web', coupon: { code: 'WELCOME10', percent: 10 } },
	} as const;

	const [jsonText, setJsonText] = useState<string>(() => JSON.stringify(sample, null, 2));
	const parsed = useMemo(() => {
		try { return JSON.parse(jsonText); } catch { return null; }
	}, [jsonText]);
	const parseError = useMemo(() => {
		try { JSON.parse(jsonText); return null; } catch (e) { return (e as Error).message; }
	}, [jsonText]);

	return (
		<div className="space-y-5">
			<div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
				<strong>Cómo interactuar:</strong> Pega o edita JSON en el panel izquierdo y observa el árbol a la derecha. Expande/colapsa nodos y utiliza ⧉ para copiar la ruta.
			</div>

			<div className="grid md:grid-cols-2 gap-5 items-start">
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setJsonText(JSON.stringify(sample, null, 2))}
							className="inline-flex items-center rounded-md border border-indigo-300 dark:border-indigo-700 bg-white/70 dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-zinc-700 transition"
						>Cargar ejemplo</button>
						<button
							type="button"
							disabled={!parsed}
							onClick={() => parsed && setJsonText(JSON.stringify(parsed, null, 2))}
							className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
						>Formatear JSON</button>
					</div>
								<textarea
						value={jsonText}
						onChange={(e) => setJsonText(e.target.value)}
						rows={16}
						spellCheck={false}
						className="w-full font-mono text-[12px] leading-5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 p-3"
									placeholder='{"key": "value"}'
					/>
					{parseError && (
						<div className="text-[11px] text-red-700 dark:text-red-300">Error de parseo: {parseError}</div>
					)}
				</div>

				<div>
					<JsonTreeRadix data={(parsed ?? sample) as any} rootLabel="root" />
				</div>
			</div>
		</div>
	);
};

Playground.parameters = {
	docs: {
		description: {
			story: 'El mismo componente recorre objetos, arreglos y valores primitivos gracias a la interfaz común del Composite.'
		}
	}
};

