"use client";

import type { BannerProps } from "./interfaces/banner";
import { renderBanner } from "./components/banner";
import type { NotificationFactory } from "./notification-factory";

export const bannerFactory: NotificationFactory<BannerProps> = {
  createSuccess: (p) => renderBanner("success", p),
  createAlert: (p) => renderBanner("alert", p),
  createInformative: (p) => renderBanner("informative", p),
  createWarning: (p) => renderBanner("warning", p),
};
