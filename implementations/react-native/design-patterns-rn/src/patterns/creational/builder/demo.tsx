import React from 'react';
import { View, Text } from 'react-native';
import { Card } from './product-card';
import { CardDirector } from './director';
import { CardConcreteBuilder } from './concrete-builder';

export const BuilderDemo: React.FC = () => {
  const director = new CardDirector();
  const builderA = new CardConcreteBuilder();
  const builderB = new CardConcreteBuilder();

  const a = director.construct(builderA, {
    title: 'MacBook Pro 14"',
    subtitle: 'M3 Pro',
    mediaUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    body: 'Pantalla Liquid Retina XDR y batería de larga duración.',
    footer: <Text style={{ color: '#2563eb' }}>Comprar</Text>,
  });
  const b = director.construct(builderB, {
    title: 'Teclado Mecánico',
    subtitle: 'Switches rojos',
    body: 'Compacto, retroiluminado y con cable trenzado.',
  });

  return (
    <View style={{ gap: 10 }}>
      <Card {...a} />
      <Card {...b} />
    </View>
  );
};
