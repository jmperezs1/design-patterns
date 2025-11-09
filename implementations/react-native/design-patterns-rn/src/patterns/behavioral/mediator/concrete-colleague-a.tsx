import { Colleague } from './colleague';

export class SearchBox extends Colleague {
  value = '';
  operationA(newValue: string) {
    this.value = newValue;
    this.m.notify(this, 'A:SEARCH_CHANGED', newValue);
  }
}
