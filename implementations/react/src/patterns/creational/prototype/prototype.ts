/**
 * Interfaz que define el patrón Prototype para clonar objetos.
 */

export interface Prototype<T> {
  /**
  * Clona el objeto actual, permitiendo sobrescribir propiedades específicas.
  * @param overrides Propiedades que sobrescriben las del objeto clonado.
  */
  clone(overrides?: Partial<T>): Prototype<T>;
  
  /**
   * Obtiene el objeto subyacente del prototipo.
   */
  get(): T; 
}