export type BannerProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  hideIcon?: boolean;
  compact?: boolean;
  dismissible?: boolean;
  onClose?: () => void;
};