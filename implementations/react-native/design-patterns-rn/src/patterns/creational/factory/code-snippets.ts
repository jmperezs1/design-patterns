import type { CodeSnippet } from '../../../registry/types';

export const factoryCodeSnippets: CodeSnippet[] = [
  { title: 'variants/variants.ts', language: 'ts', code: `export type Variant = 'success' | 'alert' | 'informative' | 'warning' | 'default';` },
  { title: 'components/wrapper.tsx', language: 'tsx', code: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Variant } from '../variants/variants';

export function createWrapper(variant: Variant, child: React.ReactNode) {
  let s: { bg: string; ring: string; accent: string; icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] } = { bg: '#F5F5F5', ring: '#E0E0E0', accent: '#424242', icon: 'information-outline' };
  switch (variant) {
    case 'success': s = { bg: '#E8F5E9', ring: '#A5D6A7', accent: '#2E7D32', icon: 'check-circle' }; break;
    case 'alert': s = { bg: '#FFEBEE', ring: '#EF9A9A', accent: '#C62828', icon: 'close-circle' }; break;
    case 'informative': s = { bg: '#E3F2FD', ring: '#90CAF9', accent: '#1565C0', icon: 'information' }; break;
    case 'warning': s = { bg: '#FFF8E1', ring: '#FFE082', accent: '#FF8F00', icon: 'alert-circle' }; break;
    default: break;
  }
  return (
    <View style={[styles.container, { backgroundColor: s.bg, borderColor: s.ring }]}>
      <MaterialCommunityIcons name={s.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={18} color={s.accent} style={{ marginTop: 2 }} />
      <View style={{ width: 8 }} />
      <View style={{ flex: 1 }}>{typeof child === 'string' ? <Text>{child}</Text> : child}</View>
    </View>
  );
}

export const Wrapper: React.FC<{ variant: Variant; children: React.ReactNode }> = ({ variant, children }) =>
  createWrapper(variant, children);

const styles = StyleSheet.create({
  container: { padding: 12, borderRadius: 12, borderWidth: 1, flexDirection: 'row', alignItems: 'flex-start' },
});
` },
  { title: 'factory.tsx', language: 'tsx', code: `export { createWrapper, Wrapper } from './components/wrapper';` },
  { title: 'demo.tsx', language: 'tsx', code: `import React from 'react';
import { View, Text } from 'react-native';
import { createWrapper } from './components/wrapper';

export const FactoryDemo: React.FC = () => (
  <View>
    {createWrapper('success', <Text>Archivo subido correctamente</Text>)}
    <View style={{ height: 12 }} />
    {createWrapper('warning', <Text>Espacio de almacenamiento limitado</Text>)}
    <View style={{ height: 12 }} />
    {createWrapper('alert', <Text>Error de conexión</Text>)}
    <View style={{ height: 12 }} />
    {createWrapper('informative', <Text>Nueva versión disponible</Text>)}
  </View>
);
` },
];
 