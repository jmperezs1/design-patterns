export class NotificationService {
  async email(to: string, subject: string, body: string) { return { to, subject, body }; }
  async sms(to: string, text: string) { return { to, text }; }
}
