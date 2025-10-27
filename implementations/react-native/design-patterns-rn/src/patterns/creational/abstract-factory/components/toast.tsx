import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ToastProps } from '../interfaces/toast';
import type { Variant } from '../types/variants';
import { VARIANT } from '../types/variants';

export function renderToast(variant: Variant, props: ToastProps) {
  const cfg = VARIANT[variant];
  const Icon = cfg.icon;
  const { title = cfg.title, description, open = true, onOpenChange } = props;
  if (!open) return null;
  return (
    <View style={[styles.container, { backgroundColor: cfg.bg, borderColor: cfg.border }]}
      accessibilityRole="alert"
    >
      <Icon />
      <View style={{ flex: 1 }}>
        {!!title && <Text style={[styles.title, { color: cfg.color }]}>{title}</Text>}
        {!!description && <Text style={styles.desc}>{description}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  title: { fontWeight: '700' },
  desc: { marginTop: 4 },
});
