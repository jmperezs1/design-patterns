import type { BannerProps } from './interfaces/banner';
import type { NotificationFactory } from './notification-factory';
import { renderBanner } from './components/banner';

export const bannerFactory: NotificationFactory<BannerProps> = {
  createSuccess: (p) => renderBanner('success', p),
  createAlert: (p) => renderBanner('alert', p),
  createInformative: (p) => renderBanner('informative', p),
  createWarning: (p) => renderBanner('warning', p),
};
