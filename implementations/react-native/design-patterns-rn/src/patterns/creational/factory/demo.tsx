import React from 'react';
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
