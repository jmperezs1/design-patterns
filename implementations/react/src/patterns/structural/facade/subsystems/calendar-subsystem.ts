import type { Slot } from "../types/types";

/**
 * Subsistema de calendario que maneja reservas y cancelaciones de citas.
 */

export class CalendarAPI {
  async reserve(slot: Slot) {
    return { reservationId: "res_" + Math.random().toString(36).slice(2), slot };
  }
  async cancel(reservationId: string) {
    return { cancelled: true, reservationId };
  }
}