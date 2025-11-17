import type { Payment } from "../types/types";

/**
 * Subsistema de pago que maneja la autorización y anulación de pagos.
 */

export class PaymentGateway {
  private shouldFail: boolean;
  constructor(shouldFail = false) { this.shouldFail = shouldFail; }
  async authorize(p: Payment) {
    if (this.shouldFail) throw new Error("Card declined");
    return { txId: "tx_" + Math.random().toString(36).slice(2), status: "authorized" as const, ...p };
  }
  async void(txId: string) { return { voided: true, txId }; }
}