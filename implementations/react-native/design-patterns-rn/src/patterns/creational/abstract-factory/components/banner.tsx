import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { BannerProps } from '../interfaces/banner';
import type { Variant } from '../types/variants';
import { VARIANT } from '../types/variants';

export function renderBanner(variant: Variant, props: BannerProps) {
  const cfg = VARIANT[variant];
  const Icon = cfg.icon;
  const { title = cfg.title, description, actions, compact } = props;
  return (
    <View style={[styles.container, { backgroundColor: cfg.bg, borderColor: cfg.border }]}
      accessibilityRole={variant === 'alert' || variant === 'warning' ? 'alert' : 'summary'}
    >
      <View style={styles.iconWrap}><Icon /></View>
      <View style={{ flex: 1 }}>
        {!!title && <Text style={[styles.title, { color: cfg.color }]}>{title}</Text>}
        {!!description && <Text style={[styles.desc, compact && { marginTop: 2 }]}>{description}</Text>}
        {!!actions && <View style={{ marginTop: 6 }}>{actions}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  iconWrap: { marginTop: 2 },
  title: { fontWeight: '700' },
  desc: { marginTop: 4 },
});
