import { ContactFlow } from "../concrete-support";
import { SimpleForm } from "./simple-form";

export function ContactPage() {
  return (
    <SimpleForm
      title="Contact support"
      flow={new ContactFlow()}
      fields={[
        { name: "subject", label: "Subject", placeholder: "Billing issue" },
        { name: "message", label: "Message", type: "text", placeholder: "Describe the problem..." },
        { name: "priority", label: "Priority (low/normal/high)" },
      ]}
    />
  );
}
