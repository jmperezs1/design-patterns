import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export type Category = 'Creational' | 'Structural' | 'Behavioral';

export type CodeSnippet = {
  title: string;
  code: string;
  language?: string; // 'tsx' | 'typescript' | 'javascript' | 'dart' ...
};

export type PatternImages = {
  // URIs for images (remote, data:, or file://). For local RN assets use components or inline require in screens.
  general?: string;
  specific?: string;
  extras?: string[];
};

export type PatternEntry = {
  id: string;
  name: string;
  category: 'Creational' | 'Structural' | 'Behavioral' | (string & {});
  Component: ComponentType<ViewProps>;
  markdown?: string;
  codeSnippets?: CodeSnippet[];
  images?: PatternImages;
};