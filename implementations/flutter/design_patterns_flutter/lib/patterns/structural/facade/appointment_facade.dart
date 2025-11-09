import 'subsystems/audit_subsystem.dart';
import 'subsystems/calendar_subsystem.dart';
import 'subsystems/crm_subsystem.dart';
import 'subsystems/notification_subsystem.dart';
import 'subsystems/payment_subsystem.dart';
import 'types.dart';

class AppointmentFacade {
  final CalendarAPI calendar;
  final PaymentGateway payments;
  final CRMService crm;
  final NotificationService notify;
  final AuditLogger log;

  AppointmentFacade({
    CalendarAPI? calendar,
    PaymentGateway? payments,
    CRMService? crm,
    NotificationService? notify,
    AuditLogger? log,
  })  : calendar = calendar ?? CalendarAPI(),
        payments = payments ?? PaymentGateway(),
        crm = crm ?? CRMService(),
        notify = notify ?? NotificationService(),
        log = log ?? AuditLogger();

  Future<Map<String, dynamic>> book({required Customer customer, required Slot slot, required Payment payment}) async {
    final steps = <String>[];
    String? reservationId;
    String? txId;

    try {
      final c = await crm.upsertCustomer(customer);
      steps.add(log.log('CRM: upserted customer ${c.customerId} (${c.email})'));

      final res = await calendar.reserve({'resourceId': slot.resourceId, 'start': slot.start, 'end': slot.end});
      reservationId = res.reservationId;
      steps.add(log.log('Calendar: reserved slot $reservationId'));

      final pay = await payments.authorize({'amount': payment.amount, 'currency': payment.currency});
      txId = pay.txId;
      steps.add(log.log('Payments: authorized $txId ${pay.amount} ${pay.currency}'));

      final act = await crm.createActivity({'customerId': c.customerId, 'slot': slot, 'txId': txId});
      steps.add(log.log('CRM: created activity ${act.activityId}'));

      await notify.email(c.email, 'Appointment confirmed', 'See you at ${slot.start}');
      steps.add(log.log('Notify: email sent to ${c.email}'));

      if (c.phone != null) {
        await notify.sms(c.phone!, 'Your appointment is confirmed.');
        steps.add(log.log('Notify: SMS sent to ${c.phone}'));
      }

      steps.add('Booking complete');
      return {'ok': true, 'steps': steps};
    } catch (e) {
      final msg = (e is Exception) ? e.toString() : 'Unknown error';
      steps.add('Failed: $msg');

      // Best-effort rollback
      if (txId != null) {
        await payments.voidPayment(txId);
        steps.add(log.log('Rollback: voided payment $txId'));
      }
      if (reservationId != null) {
        await calendar.cancel(reservationId);
        steps.add(log.log('Rollback: cancelled reservation $reservationId'));
      }

      return {'ok': false, 'steps': steps, 'error': msg};
    }
  }
}
