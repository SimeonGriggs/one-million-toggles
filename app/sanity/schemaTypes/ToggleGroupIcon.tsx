// import {useTheme} from '@sanity/ui'

import type {ToggleGroup} from '~/types/toggleGroup'

type ToggleGroupIconProps = {
  toggles?: ToggleGroup['toggles']
}

export function ToggleGroupIcon(props: ToggleGroupIconProps) {
  const toggles = props?.toggles || []
  const count = toggles.length
  const enabledCount = toggles.filter((t) => t.enabled).length
  const radius = 20
  const strokeWidth = 8
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${(enabledCount / count) * circumference} ${circumference}`
  const strokeDashoffset = 0

  // const theme = useTheme()
  // const baseStroke = theme.sanity.v2?.color.badge.positive.bg
  // const completionStroke = theme.sanity.v2?.color.badge.positive.fg
  const baseStroke = '#efefef'
  const completionStroke = '#ace975'

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={baseStroke}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke={completionStroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  )
}
