"use client"

import * as RadixToast from "@radix-ui/react-toast"
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"

export type Variant = "success" | "alert" | "informative" | "warning"


export function createToast(
  variant: Variant,
  description: string
) {
  let IconComponent: React.ComponentType<{ className?: string }>
  let bgClass: string
  let title: string
  switch (variant) {
    case "success":
      IconComponent = CheckCircle
      bgClass = "bg-green-100 text-green-800"
      title = "Success"
      break
    case "alert":
      IconComponent = XCircle
      bgClass = "bg-red-100 text-red-800"
      title = "Alert"
      break
    case "informative":
      IconComponent = Info
      bgClass = "bg-blue-100 text-blue-800"
      title = "Information"
      break
    case "warning":
      IconComponent = AlertTriangle
      bgClass = "bg-yellow-100 text-yellow-800"
      title = "Warning"
      break
    default:
      IconComponent = Info
      bgClass = "bg-gray-100 text-gray-800"
      title = "Notification"
  }

  return (
    <RadixToast.Root open className={`p-4 rounded ${bgClass} flex items-start gap-3`}>
      <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <RadixToast.Title className="font-semibold block">{title}</RadixToast.Title>
        {description && (
          <RadixToast.Description className="mt-1">
            {description}
          </RadixToast.Description>
        )}
      </div>
    </RadixToast.Root>
  )
}
