import type { Meta, StoryFn } from '@storybook/react';
import { Box, Flex, Badge, Separator } from '@radix-ui/themes';
import { CodeBlock } from '../../../components/code-block';
import AppointmentDemoRadix from './client';

// Raw sources
import facadeCode from './facade.ts?raw';
import crmCode from './subsystems/crm-subsystem.ts?raw';
import calendarCode from './subsystems/calendar-subsystem.ts?raw';
import paymentCode from './subsystems/payment-subsystem.ts?raw';
import notificationCode from './subsystems/notification-subsystem.ts?raw';
import auditCode from './subsystems/audit-subsystem.ts?raw';
import typesCode from './types/types.ts?raw';
import clientCode from './client.tsx?raw';

export default {
	title: 'Design Patterns/Structural/Facade Pattern',
	parameters: {
		docs: {
			description: {
				component:
					'Facade expone una interfaz unificada y simple hacia un subsistema complejo. El cliente invoca un único método del "fachada" y éste orquesta múltiples servicios internos, ocultando detalles y errores, y aplicando compensaciones si algo falla.'
			}
		}
	}
} as Meta;

export const Implementation: StoryFn = () => {
	return (
		<Box className="space-y-8" p="3">
			{/* Header */}
			<Flex align="center" gap="3" className="flex-wrap">
				<h3 className="text-2xl font-semibold tracking-tight">Facade Pattern</h3>
				<Badge variant="soft" color="cyan">Estructural</Badge>
			</Flex>

			{/* Resumen */}
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
				<strong>Facade</strong> simplifica la interacción con sistemas complejos exponiendo una interfaz mínima. Reduce acoplamiento, mejora la legibilidad y centraliza reglas transversales como validación, logging, reintentos y <em>rollback</em>.
			</p>

			<Separator size="4" />

			{/* Problemática / Solución General */}
			<section className="grid md:grid-cols-2 gap-6">
				<div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
					<p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
						El cliente no debería conocer el orden ni los detalles de múltiples APIs (CRM, calendario, pagos, notificaciones, auditoría). La coordinación manual incrementa el acoplamiento y la posibilidad de errores.
					</p>
				</div>
				<div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
					<p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
						Introducir una <strong>fachada</strong> que expone un método cohesivo (por ejemplo <code>book()</code>). Internamente orquesta los subsistemas, maneja errores y aplica acciones compensatorias para mantener consistencia.
					</p>
				</div>
			</section>

			{/* Caso Específico */}
			<section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
				<header className="flex items-center gap-3 flex-wrap">
					<h4 className="text-lg font-semibold tracking-tight">Caso Específico: Reserva de Cita con Rollback</h4>
					<Badge variant="soft" color="purple">Ejemplo Aplicado</Badge>
				</header>

				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						Para agendar una cita, hay que: validar/crear cliente, reservar un espacio en calendario, cobrar el pago, enviar notificación y registrar auditoría. Si el pago falla, debe revertirse la reserva.
					</p>
				</div>

				<div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
					<p className="text-sm text-indigo-900 dark:text-indigo-200">
						<code>AppointmentFacade</code> coordina <code>CRM</code>, <code>Calendar</code>, <code>Payments</code>, <code>Notifications</code> y <code>Audit</code>. Ejecuta pasos en orden y, ante error en pagos, aplica compensación cancelando la reserva y dejando trazas.
					</p>
				</div>

				{/* Código Fuente */}
				<div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
					<h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
					<details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
						<summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
							<span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver fachada, subsistemas y cliente</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
							<span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
						</summary>
						<div className="p-4 space-y-4">
							<CodeBlock code={facadeCode} title="facade.ts" />
							<CodeBlock code={crmCode} title="subsystems/crm-subsystem.ts" />
							<CodeBlock code={calendarCode} title="subsystems/calendar-subsystem.ts" />
							<CodeBlock code={paymentCode} title="subsystems/payment-subsystem.ts" />
							<CodeBlock code={notificationCode} title="subsystems/notification-subsystem.ts" />
							<CodeBlock code={auditCode} title="subsystems/audit-subsystem.ts" />
							<CodeBlock code={typesCode} title="types/types.ts" />
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
				<strong>Cómo interactuar:</strong> Ajusta los datos, prueba los botones rápidos de horario y activa “Simulate payment failure” para observar el <em>rollback</em> y el log paso a paso.
			</div>
			<AppointmentDemoRadix />
		</div>
	);
};

Playground.parameters = {
	docs: {
		description: {
			story: 'El cliente sólo invoca facade.book(). La fachada orquesta los subsistemas, valida y registra acciones; si pago falla, revierte la agenda (compensación) y reporta en el log.'
		}
	}
};

