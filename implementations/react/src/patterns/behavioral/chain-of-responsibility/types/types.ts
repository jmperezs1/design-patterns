export type Severity = "low" | "medium" | "high";
export type Category = "billing" | "technical" | "security" | "other";

export type Ticket = { id: string; severity: Severity; category: Category; description: string };

export type HandleResult = {
  handledBy: string;
  message: string;
  trail: string[];
};