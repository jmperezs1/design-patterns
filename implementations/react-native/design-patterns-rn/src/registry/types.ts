import type { ComponentType } from 'react';
import type { ViewProps, ImageSourcePropType } from 'react-native';

export type Category = 'Creational' | 'Structural' | 'Behavioral';

export type CodeSnippet = {
  title: string;
  code: string;
  language?: string; // 'tsx' | 'typescript' | 'javascript' | 'dart' ...
};

export type PatternImages = {
  // Use React Native ImageSource: require('...'), { uri }, or an array for extras
  general?: ImageSourcePropType;
  specific?: ImageSourcePropType;
  extras?: ImageSourcePropType[];
};

export type PatternEntry = {
  id: string;
  name: string;
  category: 'Creational' | 'Structural' | 'Behavioral' | (string & {});
  Component: ComponentType<ViewProps>;
  // Flutter-like outline fields (optional)
  resumen?: string; // short summary under header
  problematicaGeneral?: string;
  solucionGeneral?: string;
  casoEspecifico?: string;
  solucionEspecifica?: string;
  playgroundExplicacion?: string;
  playgroundComoInteractuar?: string;
  // Legacy single-block description (fallback to resumen)
  markdown?: string;
  codeSnippets?: CodeSnippet[];
  images?: PatternImages;
};