export interface Prototype<T> {
  clone(overrides?: Partial<T>): Prototype<T>;
  get(): T;
}
