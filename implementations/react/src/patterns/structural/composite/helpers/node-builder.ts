import { ArrayNode } from "../array-composite";
import type { JsonComponent } from "../component";
import { PrimitiveNode } from "../leaf";
import { ObjectNode } from "../object-composite";
import type { Json } from "../types/json";

export function buildNode(keyLabel: string, value: Json): JsonComponent {
  if (Array.isArray(value)) return new ArrayNode(keyLabel, value);
  if (value !== null && typeof value === "object") return new ObjectNode(keyLabel, value as any);
  return new PrimitiveNode(keyLabel, value as any);
}