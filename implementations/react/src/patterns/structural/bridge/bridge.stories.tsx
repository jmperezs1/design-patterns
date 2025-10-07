import type { Meta, StoryFn } from '@storybook/react';
import { CodeBlock } from '../../../components/code-block';
import BridgeDemoRadix from './components/export-demo';

// Raw source imports
import abstractionCode from './abstraction.ts?raw';
import implementorCode from './implementor.ts?raw';
import csvCode from './csv-implementor.ts?raw';
import jsonCode from './json-implementor.ts?raw';
import ordersCode from './order-abstraction.ts?raw';
import inventoryCode from './inventory-abstraction.ts?raw';
import demoCode from './components/export-demo.tsx?raw';

export default {
  title: 'Design Patterns/Structural/Bridge Pattern',
  parameters: {
    docs: {
      description: {
        component: 'El patrón Bridge desacopla una abstracción (Report) de su implementación (Exporter) permitiendo combinarlas independientemente. Aquí distintos tipos de reportes (Orders, Inventory) pueden exportarse en diferentes formatos (JSON, CSV) sin crear una explosión de subclases.'
      }
    }
  }
} as Meta;

export const Implementation: StoryFn = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold mb-2">Bridge Pattern</h3>
    <p className="text-sm text-gray-600 text-justify">
      Este ejemplo muestra cómo <strong>Bridge</strong> separa dos ejes de cambio: el <em>tipo de reporte</em> y el <em>formato de exportación</em>. La clase abstracta <code>Report</code> define el flujo general para construir y exportar datos, mientras que los exportadores (<code>JsonExporter</code>, <code>CsvExporter</code>) implementan el detalle de serialización. Esto evita que debamos crear clases como <code>OrdersJsonReport</code>, <code>OrdersCsvReport</code>, <code>InventoryJsonReport</code>, etc. En su lugar, combinamos libremente una abstracción con una implementación en tiempo de ejecución.
    </p>
    <details className="rounded-lg border bg-white p-3 open:pb-3">
      <summary className="cursor-pointer select-none text-sm font-medium">Ver código fuente</summary>
      <div className="mt-3 space-y-3">
        <CodeBlock code={abstractionCode} title="abstraction.ts" />
        <CodeBlock code={implementorCode} title="implementor.ts" />
        <CodeBlock code={ordersCode} title="order-abstraction.ts" />
        <CodeBlock code={inventoryCode} title="inventory-abstraction.ts" />
        <CodeBlock code={csvCode} title="csv-implementor.ts" />
        <CodeBlock code={jsonCode} title="json-implementor.ts" />
        <CodeBlock code={demoCode} title="components/export-demo.tsx" />
      </div>
    </details>
  </div>
);
Implementation.parameters = {
  docs: {
    description: {
      story: 'Documentación y código del patrón Bridge. El Playground permite combinar reportes y exportadores dinámicamente.'
    }
  }
};

export const Playground: StoryFn = () => <BridgeDemoRadix />;
Playground.parameters = {
  docs: {
    description: {
      story: 'Playground interactivo: selecciona tipo de reporte y formato de exportación para generar el archivo resultante.'
    }
  }
};
