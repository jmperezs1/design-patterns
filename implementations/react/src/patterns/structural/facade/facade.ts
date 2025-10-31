import { AuditLogger } from "./subsystems/audit-subsystem";
import { CalendarAPI } from "./subsystems/calendar-subsystem";
import { CRMService } from "./subsystems/crm-subsystem";
import { NotificationService } from "./subsystems/notification-subsystem";
import { PaymentGateway } from "./subsystems/payment-subsystem";
import type { Customer, Payment, Slot } from "./types/types";

export class AppointmentFacade {
  private calendar: CalendarAPI;
  private payments: PaymentGateway;
  private crm: CRMService;
  private notify: NotificationService;
  private log = new AuditLogger();

  constructor(
    calendar?: CalendarAPI,
    payments?: PaymentGateway,      
    crm?: CRMService,
    notify?: NotificationService,
    log? : AuditLogger
    
  ) {
    this.calendar = calendar ?? new CalendarAPI();
    this.payments = payments ?? new PaymentGateway();     
    this.crm = crm ?? new CRMService();
    this.notify = notify ?? new NotificationService();
    this.log = log ?? new AuditLogger();
  }

  async book(opts: {
    customer: Customer;
    slot: Slot;
    payment: Payment;
  }): Promise<{ ok: true; steps: string[] } | { ok: false; steps: string[]; error: string }> {
    const steps: string[] = [];
    let reservationId: string | null = null;
    let txId: string | null = null;

    try {
      const c = await this.crm.upsertCustomer(opts.customer);
      steps.push(this.log.log(`CRM: upserted customer ${c.customerId} (${c.email})`));

      const res = await this.calendar.reserve(opts.slot);
      reservationId = res.reservationId;
      steps.push(this.log.log(`Calendar: reserved slot ${reservationId}`));

      const pay = await this.payments.authorize(opts.payment);
      txId = pay.txId;
      steps.push(this.log.log(`Payments: authorized ${pay.txId} ${pay.amount} ${pay.currency}`));

      const act = await this.crm.createActivity({ customerId: c.customerId, slot: opts.slot, txId });
      steps.push(this.log.log(`CRM: created activity ${act.activityId}`));

      await this.notify.email(c.email, "Appointment confirmed", `See you at ${opts.slot.start}`);
      steps.push(this.log.log(`Notify: email sent to ${c.email}`));

      if (c.phone) {
        await this.notify.sms(c.phone, "Your appointment is confirmed.");
        steps.push(this.log.log(`Notify: SMS sent to ${c.phone}`));
      }

      steps.push("Booking complete");
      return { ok: true, steps };
    } catch (e) {
      const msg = (e as Error).message || "Unknown error";
      steps.push(`Failed: ${msg}`);

      // Best-effort rollback
      if (txId) {
        await this.payments.void(txId);
        steps.push(this.log.log(`Rollback: voided payment ${txId}`));
      }
      if (reservationId) {
        await this.calendar.cancel(reservationId);
        steps.push(this.log.log(`Rollback: cancelled reservation ${reservationId}`));
      }

      return { ok: false, steps, error: msg };
    }
  }
}
