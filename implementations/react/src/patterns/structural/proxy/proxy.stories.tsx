import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import ProxyDemo from './client';

// Raw sources
import subjectCode from './subject.ts?raw';
import realSubjectCode from './real-subject.ts?raw';
import proxyCode from './proxy.ts?raw';
import typeCode from './type/type.ts?raw';
import clientCode from './client.tsx?raw';

export default {
	title: 'Design Patterns/Structural/Proxy Pattern',
	parameters: {
		docs: {
			description: {
				component:
					  'Proxy actúa como un sustituto que controla el acceso a un objeto real: agrega caché, control de acceso y carga diferida, y evita llamadas duplicadas sin cambiar al sujeto real.'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Proxy Pattern</h3>
				<Badge variant="soft" color="cyan">Estructural</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
			<strong>Proxy</strong> provee una interfaz idéntica al sujeto real, pero añade responsabilidades transversales (caché, métricas, control de tasa) y evita llamadas duplicadas. El cliente no necesita saber si habla con el proxy o con el sujeto real.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Llamar directamente al servicio real puede ser costoso (latencia, recursos) y no tiene aspectos transversales como caché o mecanismos para evitar solicitudes duplicadas simultáneas.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Insertar un <strong>Proxy</strong> que implemente la misma interfaz que el sujeto real. El proxy decide si usa caché, comparte inflight requests, o delega al sujeto real y actualiza métricas.
					</p>
				</div>
			</section>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					  <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Proxy con caché y solicitudes simultáneas compartidas</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Un servicio HTTP de productos tarda ~600ms por petición. Si varios componentes piden el mismo ID a la vez, se disparan llamadas duplicadas; además, no hay caché.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						<code>CachingProductProxy</code> implementa la interfaz <code>ProductService</code>. Revisa caché, deduplica requests simultáneos por ID, y delega a <code>HttpProductService</code> sólo cuando es necesario, actualizando métricas.
					</p>
				</div>

				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver interfaz, sujeto real, proxy y cliente</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={typeCode} title="type/type.ts" />
							<CodeBlock code={subjectCode} title="subject.ts" />
							<CodeBlock code={realSubjectCode} title="real-subject.ts" />
							<CodeBlock code={proxyCode} title="proxy.ts" />
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
					<div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200 space-y-1">
				<div>
						<strong>Cómo interactuar:</strong> Cambia el ID y presiona “Cargar”. Prueba “Ráfaga x5” para ver cómo el proxy evita solicitudes duplicadas cuando hay varias en paralelo. Observa los contadores de caché y de llamadas de red.
				</div>
				<div>
						<strong>Tamaño de caché</strong> = número de IDs distintos guardados en memoria. Sube sólo la primera vez que cargas un ID (cache miss). No cambia en <em>cache hits</em> ni cuando hay solicitudes simultáneas compartidas. “Limpiar caché” lo reinicia a 0.
				</div>
			</div>
			<ProxyDemo />
		</div>
	);
};

Playground.parameters = {
	docs: {
		description: {
					story: 'El Proxy añade caché y evita llamadas duplicadas simultáneas sin modificar el servicio HTTP. El cliente sigue usando la misma interfaz.'
		}
	}
};

