import { Colleague } from './colleague';
import type { Item } from './types/type';

export class CategoryFilter extends Colleague {
  value: 'all' | Item['category'] = 'all';
  operationC(newCat: 'all' | Item['category']) {
    this.value = newCat;
    this.m.notify(this, 'C:CATEGORY_CHANGED', newCat);
  }
}
