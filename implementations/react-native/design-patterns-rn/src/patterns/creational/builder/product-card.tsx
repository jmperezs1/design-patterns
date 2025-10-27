import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export type CardProduct = {
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Card: React.FC<CardProduct> = ({ title, subtitle, mediaUrl, body, footer }) => {
  return (
    <View style={styles.container}>
      {!!mediaUrl && (
        <Image source={{ uri: mediaUrl }} style={styles.media} resizeMode="cover" />
      )}
      {(title || subtitle) && (
        <View style={{ padding: 12 }}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {!!body && <View style={{ padding: 12 }}>{typeof body === 'string' ? <Text>{body}</Text> : body}</View>}
      {!!footer && (
        <View style={styles.footer}>{typeof footer === 'string' ? <Text>{footer}</Text> : footer}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, overflow: 'hidden', backgroundColor: 'white' },
  media: { width: '100%', height: 160 },
  title: { fontWeight: '700' },
  subtitle: { color: '#6b7280', fontSize: 13, marginTop: 2 },
  footer: { borderTopWidth: 1, borderTopColor: '#e5e7eb', padding: 12 },
});
