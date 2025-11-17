import { FormTemplate } from "./abstract-class";
/**
 * Concrete Class que implementa los pasos específicos para un flujo de contacto de soporte.
 */
export class ContactFlow extends FormTemplate {
  protected validate(data: Record<string, any>) {
    if (!data.subject) throw new Error("Subject is required");
    if (!data.message) throw new Error("Message is required");
    return {
      subject: String(data.subject).trim(),
      message: String(data.message).trim(),
      priority: data.priority || "normal",
    };
  }

  protected async send(cleanData: Record<string, any>) {
    console.log("[Contact] sending ticket:", cleanData);

    // pretend backend returns ticket info
    return {
      ticketId: "TICKET-" + Date.now(),
      status: "open",
    };
  }

  protected async afterSuccess(result: any) {
    console.log("[Contact] notify support about", result.ticketId);
  }

  protected successMessage(result: any) {
    return `Ticket ${result.ticketId} created. We'll reply soon.`;
  }
}
