import type { ReactNode } from 'react';

export type BannerProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  compact?: boolean;
};
