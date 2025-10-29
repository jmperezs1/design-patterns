import type { CodeSnippet } from '../../../registry/types';

export const abstractFactoryCodeSnippets: CodeSnippet[] = [
  { title: 'notification-factory.tsx', language: 'ts', code: `export interface NotificationFactory<TProps> {
  createSuccess: (props: TProps) => React.ReactNode;
  createAlert: (props: TProps) => React.ReactNode;
  createInformative: (props: TProps) => React.ReactNode;
  createWarning: (props: TProps) => React.ReactNode;
}` },
  { title: 'factory.tsx', language: 'tsx', code: `import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

export interface ButtonProps { label: string; onPress?: () => void }
export interface BadgeProps { text: string }

export interface UIFactory {
  Button: React.FC<ButtonProps>;
  Badge: React.FC<BadgeProps>;
}

export const MaterialFactory: UIFactory = {
  Button: ({ label, onPress }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.mBtn, pressed && { opacity: .9 }]}>
      <Text style={styles.mBtnLabel}>{label}</Text>
    </Pressable>
  ),
  Badge: ({ text }) => (
    <View style={styles.mBadge}><Text style={{ color: '#155' }}>{text}</Text></View>
  ),
};

export const MinimalFactory: UIFactory = {
  Button: ({ label, onPress }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.sBtn, pressed && { opacity: .9 }]}>
      <Text style={styles.sBtnLabel}>{label}</Text>
    </Pressable>
  ),
  Badge: ({ text }) => (
    <View style={styles.sBadge}><Text style={{ color: '#333' }}>{text}</Text></View>
  ),
};

const styles = StyleSheet.create({
  mBtn: { backgroundColor: '#0ea5e9', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  mBtnLabel: { color: 'white', fontWeight: '700' },
  mBadge: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
  sBtn: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  sBtnLabel: { color: '#111', fontWeight: '600' },
  sBadge: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
});
` },
  { title: 'banner-factory.tsx', language: 'ts', code: `import type { BannerProps } from './interfaces/banner';
import type { NotificationFactory } from './notification-factory';
import { renderBanner } from './components/banner';

export const bannerFactory: NotificationFactory<BannerProps> = {
  createSuccess: (p) => renderBanner('success', p),
  createAlert: (p) => renderBanner('alert', p),
  createInformative: (p) => renderBanner('informative', p),
  createWarning: (p) => renderBanner('warning', p),
};
` },
  { title: 'toast-factory.tsx', language: 'ts', code: `import type { ToastProps } from './interfaces/toast';
import type { NotificationFactory } from './notification-factory';
import { renderToast } from './components/toast';

export const toastFactory: NotificationFactory<ToastProps> = {
  createSuccess: (p) => renderToast('success', p),
  createAlert: (p) => renderToast('alert', p),
  createInformative: (p) => renderToast('informative', p),
  createWarning: (p) => renderToast('warning', p),
};
` },
];
