"use client";

import type { ToastProps } from "./interfaces/toast";
import { renderToast } from "./components/toast";
import type { NotificationFactory } from "./notification-factory";


export const toastFactory: NotificationFactory<ToastProps> = {
  createSuccess: (p) => renderToast("success", p),
  createAlert: (p) => renderToast("alert", p),
  createInformative: (p) => renderToast("informative", p),
  createWarning: (p) => renderToast("warning", p),
};
