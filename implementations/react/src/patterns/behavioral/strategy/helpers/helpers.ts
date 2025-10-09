import { GoldClientPriceStrategy } from "../gold-client-strategy";
import { PlatinumClientPriceStrategy } from "../platinum-client-strategy";
import { StandardClientPriceStrategy } from "../standard-client-strategy";
import type { PricingStrategy } from "../strategy-interface";
import type { ClientType } from "../types/client";
import { VIPClientPriceStrategy } from "../vip-client-strategy";

export function makeStrategy(client: ClientType): PricingStrategy {
  switch (client) {
    case "gold": return new GoldClientPriceStrategy();
    case "platinum": return new PlatinumClientPriceStrategy();
    case "vip": return new VIPClientPriceStrategy();
    default: return new StandardClientPriceStrategy();
  }
}

export const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });