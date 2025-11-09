import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { JsonValue as Json } from './types/json';
import { buildNode } from './helpers/node-builder';
import type { JsonComponent } from './component';

const sample: Json = {
  name: 'Alice',
  age: 30,
  pets: [
    { type: 'dog', name: 'Rex' },
    { type: 'cat', name: 'Mittens' }
  ],
  active: true,
  address: {
    city: 'Metropolis',
    zip: '12345'
  }
};

function TreeNode({ node, depth = 0 }: { node: JsonComponent; depth?: number }) {
  const padding = { paddingLeft: depth * 12 };
  return (
    <View style={{ marginVertical: 4 }}>
      <View style={padding as any}>
        <Text>{node.keyLabel}: {node.getPreview()}</Text>
      </View>
      {!node.isLeaf() && (
        <View>
          {node.getChildren().map((c, i) => (
            <TreeNode key={i} node={c} depth={depth + 1} />
          ))}
        </View>
      )}
    </View>
  );
}

export default function CompositeDemo() {
  const root: JsonComponent = buildNode('root', sample as Json);
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Composite — JSON Tree</Text>
      <TreeNode node={root} />
    </ScrollView>
  );
}
