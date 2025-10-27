import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NotificationFactory } from './notification-factory';
import type { BannerProps } from './interfaces/banner';
import type { ToastProps } from './interfaces/toast';
import { bannerFactory } from './banner-factory';
import { toastFactory } from './toast-factory';
import type { Variant } from './types/variants';

export const AbstractFactoryDemo: React.FC = () => {
  const [factoryKind, setFactoryKind] = useState<'banner' | 'toast'>('banner');
  const [variant, setVariant] = useState<Variant>('success');
  const [open, setOpen] = useState(true);

  const factory: NotificationFactory<BannerProps | ToastProps> =
    factoryKind === 'banner' ? (bannerFactory as any) : (toastFactory as any);

  const methodMap = {
    success: 'createSuccess',
    alert: 'createAlert',
    informative: 'createInformative',
    warning: 'createWarning',
  } as const;

  const element =
    factoryKind === 'banner'
      ? (factory as NotificationFactory<BannerProps>)[methodMap[variant]]({
          title: undefined,
          description: 'Notificación de ejemplo usando Abstract Factory',
          actions: <Text style={{ color: '#2563eb' }}>Acción</Text>,
          compact: false,
        })
      : (factory as NotificationFactory<ToastProps>)[methodMap[variant]]({
          title: undefined,
          description: 'Notificación de ejemplo usando Abstract Factory',
          open,
          onOpenChange: setOpen,
        });
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip label="Banner" active={factoryKind==='banner'} onPress={() => setFactoryKind('banner')} />
        <Chip label="Toast" active={factoryKind==='toast'} onPress={() => setFactoryKind('toast')} />
        <View style={{ width: 12 }} />
        <Chip label="Success" active={variant==='success'} onPress={() => setVariant('success')} />
        <Chip label="Alert" active={variant==='alert'} onPress={() => setVariant('alert')} />
        <Chip label="Info" active={variant==='informative'} onPress={() => setVariant('informative')} />
        <Chip label="Warning" active={variant==='warning'} onPress={() => setVariant('warning')} />
      </View>
      {factoryKind==='toast' && (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable style={styles.btn} onPress={() => setOpen(true)}><Text>Abrir</Text></Pressable>
          <Pressable style={styles.btn} onPress={() => setOpen(false)}><Text>Cerrar</Text></Pressable>
        </View>
      )}
      <View>{element}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#ddd', borderRadius: 999 },
  chipActive: { backgroundColor: '#f3f4f6' },
  btn: { paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f3f3f3', borderRadius: 8 },
});

const Chip: React.FC<{ label: string; active?: boolean; onPress: () => void }> = ({ label, active, onPress }) => (
  <Text onPress={onPress} style={[styles.chip, active && styles.chipActive]}>{label}</Text>
);

