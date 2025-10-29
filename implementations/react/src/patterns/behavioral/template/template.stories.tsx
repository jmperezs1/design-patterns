import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import { SignupPage } from './components/signup-form';
import { ContactPage } from './components/support-form';

// Raw sources
import abstractCode from './abstract-class.ts?raw';
import signupFlowCode from './concrete-signup.ts?raw';
import contactFlowCode from './concrete-support.ts?raw';
import simpleFormCode from './components/simple-form.tsx?raw';
import signupFormCode from './components/signup-form.tsx?raw';
import supportFormCode from './components/support-form.tsx?raw';

export default {
	title: 'Design Patterns/Behavioral/Template Method Pattern',
	parameters: {
		docs: {
			description: {
				component:
					'Template Method define un esqueleto de algoritmo en una clase base y delega pasos variables a subclases. Aquí lo aplicamos a flujos de formularios: Signup y Contact comparten la secuencia validar → enviar → afterSuccess → mensaje, variando sólo la implementación de cada paso.'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Template Method Pattern</h3>
				<Badge variant="soft" color="cyan">Comportamental</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>Template Method</strong> define el esqueleto de un algoritmo en una clase base (<em>template</em>) y permite a las subclases redefinir determinados pasos sin cambiar la estructura global.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						Cuando múltiples procesos comparten la misma secuencia de pasos pero difieren en la implementación de cada paso, se duplica lógica de orquestación o se dispersan condicionales difíciles de mantener.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Extraer la orquestación a una clase base con un método <code>template</code> inmutable que coordina los pasos; cada subclase implementa <code>validate</code>, <code>send</code>, <code>afterSuccess</code> y <code>successMessage</code> según su necesidad.
					</p>
				</div>
			</section>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Formularios con flujo común</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Signup y Contact comparten un flujo: validar datos, enviar al servidor, ejecutar tareas posteriores y mostrar un mensaje. Queremos reusar la secuencia y variar sólo los detalles.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						<code>FormTemplate.submit()</code> orquesta el flujo. <code>SignupFlow</code> y <code>ContactFlow</code> implementan los pasos concretos. Un componente <em>SimpleForm</em> recibe el <em>flow</em> y los campos, y delega la acción de <code>submit</code>.
					</p>
				</div>

				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver clases base y concretas, y formularios</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={abstractCode} title="abstract-class.ts" />
							<CodeBlock code={signupFlowCode} title="concrete-signup.ts" />
							<CodeBlock code={contactFlowCode} title="concrete-support.ts" />
							<CodeBlock code={simpleFormCode} title="components/simple-form.tsx" />
							<CodeBlock code={signupFormCode} title="components/signup-form.tsx" />
							<CodeBlock code={supportFormCode} title="components/support-form.tsx" />
						</div>
					</details>
				</div>
			</section>
		</Box>
	);
};

export const Playground: StoryFn = () => {
	return (
		<div className="space-y-6">
			<div className="rounded-md border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/30 p-3 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200">
				<strong>Cómo interactuar:</strong> Completa los campos y envía el formulario. En Signup se validan <em>email</em> y <em>password</em>;
				en Contact se validan <em>subject</em> y <em>message</em>. El flujo muestra errores o un mensaje de éxito.
			</div>
			<div className="grid md:grid-cols-2 gap-6">
				<SignupPage />
				<ContactPage />
			</div>
		</div>
	);
};

Playground.parameters = {
	docs: {
		description: {
			story: 'Ambos formularios comparten el algoritmo de envío definido en la clase base. Sólo cambian las validaciones, la llamada "send" y el mensaje final.'
		}
	}
};

