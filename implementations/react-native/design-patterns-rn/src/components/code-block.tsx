// src/components/CodeBlock.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, LayoutAnimation, UIManager, ScrollView } from 'react-native';

// Simple syntax highlighting for TypeScript/JavaScript
const KEYWORDS = ['export', 'import', 'interface', 'function', 'const', 'let', 'var', 'class', 'extends', 'implements', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'async', 'await', 'from', 'default'];
const TYPES = ['string', 'number', 'boolean', 'void', 'any', 'unknown', 'never', 'JSX', 'Element', 'React', 'FC', 'Props'];

const SyntaxHighlightedText: React.FC<{ code: string }> = ({ code }) => {
  const highlightCode = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      const tokens: React.ReactNode[] = [];
      
      // Simple tokenization
      const words = line.split(/(\s+|[{}()[\];,.<>:=+\-*/!&|?])/);
      
      words.forEach((word, wordIndex) => {
        if (!word) return;
        
        let color = '#e5e7eb'; // default text color
        let fontWeight: 'normal' | 'bold' = 'normal';
        
        // Keywords
        if (KEYWORDS.includes(word)) {
          color = '#569cd6'; // blue
          fontWeight = 'bold';
        }
        // Types
        else if (TYPES.includes(word)) {
          color = '#4ec9b0'; // teal
        }
        // Strings
        else if (word.startsWith('"') || word.startsWith("'") || word.startsWith('`')) {
          color = '#ce9178'; // orange
        }
        // Comments
        else if (word.startsWith('//') || word.startsWith('/*') || word.startsWith('*')) {
          color = '#6a9955'; // green
          fontWeight = 'normal';
        }
        // Numbers
        else if (/^\d+$/.test(word)) {
          color = '#b5cea8'; // light green
        }
        // Operators and punctuation
        else if (/^[{}()[\];,.<>:=+\-*/!&|?]+$/.test(word)) {
          color = '#d4d4d4'; // light gray
        }
        
        tokens.push(
          <Text 
            key={`${lineIndex}-${wordIndex}`} 
            style={{ 
              color, 
              fontWeight,
              fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
              fontSize: 13,
              lineHeight: 19,
            }}
          >
            {word}
          </Text>
        );
      });
      
      return (
        <View key={lineIndex} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {tokens}
          {lineIndex < lines.length - 1 && <Text>{'\n'}</Text>}
        </View>
      );
    });
  };

  return (
    <View>
      {highlightCode(code)}
    </View>
  );
};



if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  title: string;
  code: string;
  language?: string;
  initialOpen?: boolean;
  height?: number;
};

export const CodeBlock: React.FC<Props> = ({
  title,
  code,
  language = 'typescript',
  initialOpen = false,
  height = 320,
}) => {
  const [open, setOpen] = useState(initialOpen);
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={toggle} style={styles.header}>
        <Text style={styles.filename}>{title}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={[styles.badge, open ? styles.badgeOpen : styles.badgeClosed]}>
            <Text style={styles.badgeTxt}>{open ? 'Hide' : 'Show'}</Text>
          </View>
        </View>
      </Pressable>

      {open && (
        <View style={{ height }}>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <ScrollView style={styles.codeContainer}>
              <SyntaxHighlightedText code={code.trim()} />
            </ScrollView>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    backgroundColor: '#0b0e14', // fondo oscuro tipo Monaco
    marginTop: 12,
  },
  header: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filename: { color: '#e5e7eb', fontWeight: '700', flex: 1 },
  btn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: '#1f2937' },
  btnTxt: { color: '#e5e7eb', fontSize: 12, fontWeight: '600' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badgeOpen: { backgroundColor: '#374151' },
  badgeClosed: { backgroundColor: '#334155' },
  badgeTxt: { color: '#e5e7eb', fontSize: 12 },
  codeContainer: {
    backgroundColor: 'transparent',
    padding: 12,
    minWidth: 320,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
    fontSize: 13,
    lineHeight: 19,
    color: '#e5e7eb',
  },
});
