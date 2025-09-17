import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export type Category = 'Creational' | 'Structural' | 'Behavioral';

export type CodeSnippet = {
  title: string;
  code: string;
  language?: string; // 'tsx' | 'typescript' | 'javascript' | 'dart' ...
};

export type PatternEntry = {
  id: string;
  name: string;
  category: 'Creational' | 'Structural' | 'Behavioral' | (string & {});
  Component: ComponentType<ViewProps>;
  markdown?: string;
  codeSnippets?: CodeSnippet[];
};