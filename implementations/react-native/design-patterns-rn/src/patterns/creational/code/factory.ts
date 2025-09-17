export const kFactorySource = `
export interface NotificationFactory<TProps> {
  createSuccess(p: TProps): JSX.Element
  createAlert(p: TProps): JSX.Element
  createInformative(p: TProps): JSX.Element
  createWarning(p: TProps): JSX.Element
}
`.trim();