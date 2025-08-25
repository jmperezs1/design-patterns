export type ToastProps = {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
};
