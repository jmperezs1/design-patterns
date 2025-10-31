import type { Customer, Slot } from "../types/types";

export class CRMService {
  async upsertCustomer(c: Customer) {
    return { customerId: "cus_" + Math.random().toString(36).slice(2), ...c };
  }
  async createActivity(opts: { customerId: string; slot: Slot; txId?: string }) {
    return { activityId: "act_" + Math.random().toString(36).slice(2), ...opts };
  }
}