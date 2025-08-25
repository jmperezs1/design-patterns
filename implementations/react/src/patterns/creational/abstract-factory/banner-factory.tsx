"use client";

import React from "react";
import type { Variant } from "../factory/factory";
import type { NotificationFactory } from "./notification-factory";
import { VARIANT } from "./types/variants";

export type BannerProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  hideIcon?: boolean;
  compact?: boolean;
  dismissible?: boolean;
  onClose?: () => void;
};

const BANNER_SKIN: Record<
  Variant,
  { container: string; accent: string; iconWrap: string }
> = {
  success: {
    container: "bg-green-50 text-green-800 ring-green-200",
    accent: "bg-green-500",
    iconWrap: "bg-green-600/10",
  },
  alert: {
    container: "bg-red-50 text-red-800 ring-red-200",
    accent: "bg-red-500",
    iconWrap: "bg-red-600/10",
  },
  informative: {
    container: "bg-blue-50 text-blue-800 ring-blue-200",
    accent: "bg-blue-500",
    iconWrap: "bg-blue-600/10",
  },
  warning: {
    container: "bg-yellow-50 text-yellow-900 ring-yellow-200",
    accent: "bg-yellow-500",
    iconWrap: "bg-yellow-600/10",
  },
};

function renderBanner(variant: Variant, props: BannerProps) {
  const cfg = VARIANT[variant];                
  const skin = BANNER_SKIN[variant];            
  const Icon = cfg.icon;

  const {
    title = cfg.title,
    description,
    actions,
    compact,
  } = props;

  const role = variant === "alert" || variant === "warning" ? "alert" : "status";
  const padding = compact ? "p-3" : "p-4";

  return (
    <div
      role={role}
      aria-live="polite"
      className={[
        "relative w-full not-prose",
        padding,
        "rounded-lg ring-1 ring-inset shadow-none",
        "flex items-start gap-3",
        skin.container,
      ].join(" ")}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-1 ${skin.accent} rounded-l-lg`}
      />
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold truncate">{title}</div>}
        {description && <div className="mt-1 text-sm">{description}</div>}
        {actions && <div className="mt-2 flex items-center gap-2">{actions}</div>}
      </div>
      <span
          className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full ${skin.iconWrap}`}
        >
          <Icon className="h-4 w-4 text-current" />
        </span>

    </div>
  );
}

export const bannerFactory: NotificationFactory<BannerProps> = {
  createSuccess: (p) => renderBanner("success", p),
  createAlert: (p) => renderBanner("alert", p),
  createInformative: (p) => renderBanner("informative", p),
  createWarning: (p) => renderBanner("warning", p),
};
