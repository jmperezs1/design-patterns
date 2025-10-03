import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';

// Radix UI Themes
import {
	Box,
	Text,
	Separator,
	Callout,
	Heading,
	Code,
} from '@radix-ui/themes';

// Raw source imports
import strategyInterfaceCode from './strategy-interface.ts?raw';
import standardCode from './standard-client-strategy.ts?raw';
import goldCode from './gold-client-strategy.ts?raw';
import platinumCode from './platinum-client-strategy.ts?raw';
import vipCode from './vip-client-strategy.ts?raw';
import { PricingCatalog } from './components/pricing-catalog';
import context from './components/pricing-catalog.tsx?raw';

export default {
  title: 'Design Patterns/Behavioral/Strategy Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'El patrón Strategy encapsula algoritmos intercambiables (cálculo de precio) detrás de una interfaz común. Aquí cada estrategia aplica un descuento distinto sin que el cliente conozca los detalles.'
      }
    }
  }
} as Meta;




export const Implementation: StoryFn = () => {
	return (
		<Box p="3" style={{ maxWidth: 1180, margin: '0 auto' }}>
			<Heading size="4" mb="2">Strategy Pattern</Heading>
			<Text size="2" color="gray" mb="3">
				El patrón <strong>Strategy</strong> permite intercambiar algoritmos (cálculo de precio) en tiempo de ejecución 
				sin modificar el cliente. Cada <Code>PricingStrategy</Code> encapsula una regla de precio diferente.
			</Text>

			<Callout.Root mb="4">
				<Callout.Icon>💡</Callout.Icon>
				<Callout.Text>
					Cambiar el tipo de cliente solo cambia el objeto estrategia inyectado. El catálogo y el flujo general no se modifican.
				</Callout.Text>
			</Callout.Root>

			<Separator size="4" my="3" />

			<Heading size="3" mb="2">Código fuente</Heading>
			<details className="rounded-lg border bg-white p-3 open:pb-3 mb-4">
				<summary className="cursor-pointer select-none text-sm font-medium">Ver estrategias y la interfaz</summary>
				<div className="mt-3 space-y-3">
					<CodeBlock code={strategyInterfaceCode} title="strategy-interface.ts" />
					<CodeBlock code={standardCode} title="standard-client-strategy.ts" />
					<CodeBlock code={goldCode} title="gold-client-strategy.ts" />
					<CodeBlock code={platinumCode} title="platinum-client-strategy.ts" />
					<CodeBlock code={vipCode} title="vip-client-strategy.ts" />
                    <CodeBlock code={context} title="pricing-catalog.tsx" />
				</div>
			</details>
		</Box>
	);
};

/* ================= Playground Story ================= */
export const Playground: StoryFn = () => <PricingCatalog />;

Playground.parameters = {
  docs: {
    description: {
      story: 'Interactúa con el catálogo: cada cambio de tipo de cliente reemplaza la estrategia en tiempo de ejecución.'
    }
  }
};

