'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react'
import { Legend, ResponsiveContainer, Tooltip, TooltipProps, LegendProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { Payload } from 'recharts/types/component/DefaultLegendContent'

export type ChartConfig = Record<
  string,
  {
    label: string
    color?: string
  }
>

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactElement
}

export function ChartContainer({
  config,
  className,
  children,
}: ChartContainerProps) {
  return (
    <div 
      className={`w-full h-[300px] ${className || ''}`}
      style={
        {
          ...Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              `--color-${key}`,
              value.color,
            ])
          ),
        } as React.CSSProperties
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        {React.cloneElement(children)}
      </ResponsiveContainer>
    </div>
  )
}

interface PayloadItem {
  name: string
  value: number
  payload: {
    stroke?: string
    fill?: string
    [key: string]: string | number | boolean | undefined
  }
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: PayloadItem[]
  label?: string
  hideLabel?: boolean
  indicator?: 'line' | 'dot'
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  indicator = 'line',
}: ChartTooltipContentProps) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="mb-2 font-medium">
          {label}
        </div>
      )}
      <div className="grid gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {indicator === 'dot' && (
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: (item.payload.stroke || item.payload.fill) as string,
                }}
              />
            )}
            {indicator === 'line' && (
              <div
                className="h-0.5 w-2"
                style={{
                  backgroundColor: (item.payload.stroke || item.payload.fill) as string,
                }}
              />
            )}
            <span className="font-medium">{item.name}:</span>
            <span>{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltip(props: TooltipProps<ValueType, NameType>) {
  return <Tooltip {...props} />
}

export function ChartLegend(props: Omit<LegendProps, 'ref'>) {
  return <Legend {...props} />
}

interface ChartLegendContentProps {
  payload?: Array<Payload & { color?: string }>
}

export function ChartLegendContent({ payload }: ChartLegendContentProps) {
  return (
    <div className="flex gap-4">
      {payload?.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

/* eslint-enable @typescript-eslint/no-explicit-any */