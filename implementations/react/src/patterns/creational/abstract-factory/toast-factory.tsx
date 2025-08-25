"use client";

import * as RadixToast from "@radix-ui/react-toast";
import type { NotificationFactory } from "./notification-factory";
import { VARIANT, type Variant } from "./types/variants";

type ToastProps = {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
};



function renderToast(variant: Variant, props: ToastProps) {
  const cfg = VARIANT[variant];
  const Icon = cfg.icon;
  const { title = cfg.title, description, open = true, onOpenChange } = props;

  return (
    <RadixToast.Provider swipeDirection="right">
      <RadixToast.Root
        open={open}
        onOpenChange={onOpenChange}
        className={`p-4 rounded-xl border shadow-sm ${cfg.bg} flex items-start gap-3`}
      >
        <Icon className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="flex-1">
          <RadixToast.Title className="font-semibold">{title}</RadixToast.Title>
          {description && <RadixToast.Description className="mt-1">{description}</RadixToast.Description>}
        </div>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 w-[360px] max-w-[100vw]" />
    </RadixToast.Provider>
  );
}

export const toastFactory: NotificationFactory<ToastProps> = {
  createSuccess: (p) => renderToast("success", p),
  createAlert: (p) => renderToast("alert", p),
  createInformative: (p) => renderToast("informative", p),
  createWarning: (p) => renderToast("warning", p),
};
