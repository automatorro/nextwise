
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { sanitizeText } from "@/utils/security"

import { cn } from "@/lib/utils"

type ChartConfig = {
  [key: string]: {
    theme?: {
      light: string
      dark: string
    }
    color?: string
  }
}

type ChartContextProps = {
  id: string
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps>({
  id: "",
  config: {},
})

const ChartContainer = ({
  children,
  className,
  config,
  id,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  id: string
  config: ChartConfig
}) => {
  return (
    <ChartContext.Provider value={{ id, config }}>
      <div className={cn("relative", className)} data-chart={id} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-md p-4 text-sm", className)}
      {...props}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const THEMES = { light: "", dark: ".dark" } as const

export type { ChartConfig }
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
