/**
 * Interfaz para las expresiones en el patrón Interpreter.
 */

export interface Expression {
  interpret(): number;
}