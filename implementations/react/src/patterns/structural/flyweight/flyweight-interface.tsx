import type { JSX } from "react";

/**
 * Interfaz que define el comportamiento de un objeto Flyweight para badges.
 */

export interface FlyweightBadge {
  operation(extrinsic: { text: string; x: number; y: number; color: string }): JSX.Element;
}