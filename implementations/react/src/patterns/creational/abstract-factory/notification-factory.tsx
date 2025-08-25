import type { JSX } from "react"

export interface NotificationFactory<TProps> {
  createSuccess : (props: TProps) => JSX.Element
  createAlert : (props: TProps) => JSX.Element
  createInformative : (props: TProps) => JSX.Element
  createWarning : (props: TProps) => JSX.Element
}   