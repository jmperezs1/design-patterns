import type { ReactNode } from 'react';

export interface NotificationFactory<TProps> {
  createSuccess: (props: TProps) => ReactNode;
  createAlert: (props: TProps) => ReactNode;
  createInformative: (props: TProps) => ReactNode;
  createWarning: (props: TProps) => ReactNode;
}
