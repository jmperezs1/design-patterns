import { Bacon } from '../concrete-bacon-decorator';
import { Cheese } from '../concrete-cheese-decorator';
import { DoublePatty } from '../concrete-double-decorator';
import type { Burger } from '../interface-component';
import type { BurgerDecorator } from '../interface-decorator';
import type { AddOnKey } from '../types/add-on';

export const ADDONS: Record<
  AddOnKey,
  { label: string; build: (b: Burger) => BurgerDecorator }
> = {
  cheese: { label: 'Queso (+$0.75)', build: (b) => new Cheese(b) },
  bacon:  { label: 'Tocineta (+$1.10)',  build: (b) => new Bacon(b)  },
  double: { label: 'Extra carne (+$2.20)', build: (b) => new DoublePatty(b) },
};
