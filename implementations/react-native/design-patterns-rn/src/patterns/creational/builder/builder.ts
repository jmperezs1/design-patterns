import type { ReactNode } from 'react';
import { CardProduct } from './product-card';

export interface CardBuilder {
  setTitle(title: string): this;
  setSubtitle(subtitle: string): this;
  setMedia(url: string): this;
  setBody(content: ReactNode): this;
  setFooter(content: ReactNode): this;
  build(): CardProduct;
}
