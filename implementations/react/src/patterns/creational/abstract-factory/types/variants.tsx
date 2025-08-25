import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

export type Variant = "success" | "alert" | "informative" | "warning";

 export const VARIANT: Record<Variant, {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
}> = {
  success: { title: "Success", icon: CheckCircle,  bg: "bg-green-100 text-green-800 border-green-200" },
  alert:   { title: "Alert",   icon: XCircle,      bg: "bg-red-100 text-red-800 border-red-200" },
  informative: { title: "Information", icon: Info, bg: "bg-blue-100 text-blue-800 border-blue-200" },
  warning: { title: "Warning", icon: AlertTriangle, bg: "bg-yellow-100 text-yellow-800 border-yellow-200" },
};