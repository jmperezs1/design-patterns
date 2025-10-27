import type { ReactElement } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type Variant = 'success' | 'alert' | 'informative' | 'warning';

type VariantCfg = {
  title: string;
  icon: () => ReactElement;
  bg: string;
  border: string;
  color: string;
};

export const VARIANT: Record<Variant, VariantCfg> = {
  success: {
    title: 'Success',
    icon: () => <Icon name="check-circle" size={18} color="#166534" />, // green-700
    bg: '#dcfce7', // green-100
    border: '#a7f3d0', // green-200
    color: '#166534',
  },
  alert: {
    title: 'Alert',
    icon: () => <Icon name="close-circle" size={18} color="#991b1b" />, // red-800
    bg: '#fee2e2',
    border: '#fecaca',
    color: '#991b1b',
  },
  informative: {
    title: 'Information',
    icon: () => <Icon name="information" size={18} color="#1e3a8a" />, // blue-900
    bg: '#dbeafe',
    border: '#bfdbfe',
    color: '#1e3a8a',
  },
  warning: {
    title: 'Warning',
    icon: () => <Icon name="alert" size={18} color="#713f12" />, // amber-900
    bg: '#fef3c7',
    border: '#fde68a',
    color: '#713f12',
  },
};
