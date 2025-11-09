import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ContactPage } from './components/support-form';
import { SignupPage } from './components/signup-form';

export const TemplateDemo: React.FC = () => {
  return (
    <View style={styles.box}>
      <ScrollView>
        <Text style={styles.title}>Template Method: Formularios</Text>
        <Text style={styles.subtitle}>Define una plantilla para el flujo de envío y deja que las subclases implementen los pasos concretos.</Text>

        <View style={styles.grid}>
          <ContactPage />
          <SignupPage />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#666', marginVertical: 8 },
  grid: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
});
