import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Adaptee } from './adaptee';
import { Adapter } from './adapter';
import { ClientTableRadix } from './client';
import { CodeBlock } from '../../../components/code-block';

// Radix Themes
import {
  Theme,
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Separator,
  Callout,
  Card,
  Badge,
  Code,
} from '@radix-ui/themes';

// ----- raw source imports (Vite ?raw) -----
import targetCode from './target.tsx?raw';
import adapteeCode from './adaptee.ts?raw';
import adapterCode from './adapter.ts?raw';
import clientCode from './client.tsx?raw';
import userInterfaceCode from './interfaces/user.ts?raw';

export default {
  title: 'Design Patterns/Structural/Adapter Pattern',
  argTypes: {
    csvData: {
      control: 'text',
      table: { type: { summary: 'string' } },
      description: 'CSV data that the Adaptee returns (simulating legacy system)',
    },
  },
} as Meta;

type Args = {
  csvData?: string;
};

// Mock adaptee that allows customizing the CSV data
class CustomAdaptee extends Adaptee {
  private customCsv?: string;
  
  constructor(customCsv?: string) {
    super();
    this.customCsv = customCsv;
  }

  specificRequest(): Promise<string> {
    if (this.customCsv) {
      return Promise.resolve(this.customCsv);
    }
    return super.specificRequest();
  }
}

export const Implementation: StoryFn = () => {
  const adaptee = new Adaptee();
  const adapter = new Adapter(adaptee);

  return (
    <Theme>
      <Box p="3">
        <Heading size="4" mb="2">Adapter Pattern</Heading>
        <Text size="2" color="gray" mb="4">
          El patrón <strong>Adapter</strong> permite que interfaces incompatibles trabajen juntas. 
          En este ejemplo, tenemos un <Code>Adaptee</Code> legacy que devuelve datos CSV, pero nuestro 
          cliente espera objetos <Code>User[]</Code>. El <Code>Adapter</Code> convierte el formato CSV 
          al formato esperado sin modificar el código legacy ni el cliente.
        </Text>

        <Separator size="4" my="3" />

        <Callout.Root mb="4">
          <Callout.Icon>💡</Callout.Icon>
          <Callout.Text>
            <strong>Problema:</strong> El sistema legacy devuelve CSV, pero el cliente moderno necesita objetos tipados.
            <br />
            <strong>Solución:</strong> El Adapter implementa la interfaz Target y convierte internamente CSV → User[].
          </Callout.Text>
        </Callout.Root>

        <Separator size="4" my="3" />

        <Box mb="4">
          <Heading size="3" mb="2">Resultado en vivo</Heading>
          <Text size="2" color="gray" mb="3">
            La tabla usa el <Badge color="indigo">Adapter</Badge> para obtener datos del sistema legacy:
          </Text>
          <ClientTableRadix api={adapter} pageSize={5} />
        </Box>

        <Separator size="4" my="3" />

        <Box>
          <Heading size="3" mb="2">Implementación</Heading>
          <details className="rounded-lg border bg-white p-3 open:pb-3">
            <summary className="cursor-pointer select-none text-sm font-medium">
              Ver código fuente
            </summary>
            <div className="mt-3 space-y-3">
              <Card>
                <Box p="3">
                  <Text as="div" size="2" weight="bold" mb="2">Interfaces</Text>
                  <CodeBlock code={userInterfaceCode} title="interfaces/user.ts" />
                  <Box mt="2">
                    <CodeBlock code={targetCode} title="target.tsx" />
                  </Box>
                </Box>
              </Card>

              <Card>
                <Box p="3">
                  <Text as="div" size="2" weight="bold" mb="2">Sistema Legacy (Adaptee)</Text>
                  <CodeBlock code={adapteeCode} title="adaptee.ts" />
                </Box>
              </Card>

              <Card>
                <Box p="3">
                  <Text as="div" size="2" weight="bold" mb="2">Adapter (Convierte CSV → User[])</Text>
                  <CodeBlock code={adapterCode} title="adapter.ts" />
                </Box>
              </Card>

              <Card>
                <Box p="3">
                  <Text as="div" size="2" weight="bold" mb="2">Cliente (Usa Target interface)</Text>
                  <CodeBlock code={clientCode} title="client.tsx" />
                </Box>
              </Card>
            </div>
          </details>
        </Box>
      </Box>
    </Theme>
  );
};

export const Playground: StoryFn<Args> = (args) => {
  const [adapteeType, setAdapteeType] = React.useState<'original' | 'custom'>('original');
  
  const defaultCsv = 'id,name,email\n1,Juan Perez,juanperez@example.com\n2,Mario,mario@example.com\n3,Camila,camila@example.com';
  
  const csvData = args.csvData || defaultCsv;
  
  const adaptee = React.useMemo(() => {
    if (adapteeType === 'custom') {
      return new CustomAdaptee(csvData);
    }
    return new Adaptee();
  }, [adapteeType, csvData]);

  const adapter = React.useMemo(() => new Adapter(adaptee), [adaptee]);

  return (
    <Theme>
      <Box p="3">
        <Heading size="4" mb="3">Playground - Adapter Pattern</Heading>
        
        <Flex direction="column" gap="4">
          <Card>
            <Box p="3">
              <Heading size="3" mb="2">Configuración</Heading>
              
              <Flex direction="column" gap="3">
                <Box>
                  <Text size="2" weight="medium" mb="1">Tipo de Adaptee:</Text>
                  <Select.Root value={adapteeType} onValueChange={(value: 'original' | 'custom') => setAdapteeType(value)}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value="original">Original (datos fijos)</Select.Item>
                      <Select.Item value="custom">Personalizado (usa CSV de controles)</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>

                {adapteeType === 'original' && (
                  <Callout.Root>
                    <Callout.Text>
                      Usando el <Code>Adaptee</Code> original con datos CSV predefinidos.
                    </Callout.Text>
                  </Callout.Root>
                )}

                {adapteeType === 'custom' && (
                  <Callout.Root>
                    <Callout.Text>
                      Usando <Code>CustomAdaptee</Code> con el CSV personalizado de los controles de Storybook.
                      <br />
                      <strong>Formato esperado:</strong> <Code>id,name,email</Code> como header, luego filas de datos.
                    </Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </Box>
          </Card>

          <Card>
            <Box p="3">
              <Heading size="3" mb="2">Cliente consumiendo el Adapter</Heading>
              <Text size="2" color="gray" mb="3">
                El cliente no sabe si los datos vienen del sistema legacy o de otra fuente. 
                Solo usa la interfaz <Code>Target</Code> que implementa el <Code>Adapter</Code>.
              </Text>
              
              <Box className="rounded-lg border-2 border-dashed border-gray-300 p-2">
                <ClientTableRadix api={adapter} pageSize={5} />
              </Box>
              
              <Text size="1" color="gray" mt="2">
                💡 El Adapter traduce automáticamente CSV → User[] sin que el cliente lo sepa.
              </Text>
            </Box>
          </Card>

          <Card>
            <Box p="3">
              <Heading size="3" mb="2">Flujo de datos</Heading>
              <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                  <Badge color="orange">1. Cliente</Badge>
                  <Text size="2">→ llama a <Code>adapter.request()</Code></Text>
                </Flex>
                <Flex align="center" gap="2">
                  <Badge color="blue">2. Adapter</Badge>
                  <Text size="2">→ llama a <Code>adaptee.specificRequest()</Code></Text>
                </Flex>
                <Flex align="center" gap="2">
                  <Badge color="gray">3. Adaptee</Badge>
                  <Text size="2">→ devuelve string CSV</Text>
                </Flex>
                <Flex align="center" gap="2">
                  <Badge color="blue">4. Adapter</Badge>
                  <Text size="2">→ parsea CSV y devuelve <Code>User[]</Code></Text>
                </Flex>
                <Flex align="center" gap="2">
                  <Badge color="orange">5. Cliente</Badge>
                  <Text size="2">→ recibe <Code>User[]</Code> y renderiza la tabla</Text>
                </Flex>
              </Flex>
            </Box>
          </Card>
        </Flex>
      </Box>
    </Theme>
  );
};

Playground.args = {
  csvData: 'id,name,email\n1,Ana García,ana@example.com\n2,Carlos López,carlos@example.com\n3,María Silva,maria@example.com\n4,Pedro Martín,pedro@example.com\n5,Laura Torres,laura@example.com',
};

Playground.parameters = {
  docs: {
    description: {
      story:
        'Experimenta con diferentes datos CSV y observa cómo el Adapter convierte automáticamente el formato para el cliente.',
    },
  },
};