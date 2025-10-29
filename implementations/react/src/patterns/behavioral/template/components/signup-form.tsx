import { SignupFlow } from "../concrete-signup";
import { SimpleForm } from "./simple-form";

export function SignupPage() {
  return (
    <SimpleForm
      title="Create account"
      flow={new SignupFlow()}
      fields={[
        { name: "email", label: "Email", type: "email", placeholder: "ada@company.com" },
        { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
      ]}
    />

  );
}
