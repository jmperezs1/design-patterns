import type { JSX } from "react";

export interface FlyweightBadge {
  operation(extrinsic: { text: string; x: number; y: number; color: string }): JSX.Element;
}