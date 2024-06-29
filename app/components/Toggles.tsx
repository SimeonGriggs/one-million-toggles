import {useVirtualizer} from '@tanstack/react-virtual'
import React from 'react'

import {Toggle} from '~/components/Toggle'
import type {ToggleGroup} from '~/types/toggleGroup'

type TogglesProps = {
  data: ToggleGroup[]
}

const TOGGLE_SIZE = {
  width: 36,
  height: 20,
  padding: 10,
}

export function Toggles({data}: TogglesProps) {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => TOGGLE_SIZE.height,
    overscan: 5,
    gap: TOGGLE_SIZE.padding,
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: data[0].toggles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => TOGGLE_SIZE.width,
    gap: TOGGLE_SIZE.padding,
    overscan: 5,
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: 800,
        padding: TOGGLE_SIZE.padding / 2,
        overflow: 'auto', // Make it scroll!
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: `${columnVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment
            key={[
              data[virtualRow.index]._id,
              data[virtualRow.index].toggles.filter((t) => t.enabled).length,
            ].join('-')}
          >
            {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
              <div
                key={[
                  data[virtualRow.index].toggles[virtualColumn.index]._key,
                  data[virtualRow.index].toggles[virtualColumn.index].enabled,
                ].join('-')}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: TOGGLE_SIZE.width,
                  height: TOGGLE_SIZE.height,
                  padding: TOGGLE_SIZE.padding,
                  transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                }}
              >
                <Toggle
                  _id={data[virtualRow.index]._id}
                  _key={
                    data[virtualRow.index].toggles[virtualColumn.index]._key
                  }
                  enabled={
                    data[virtualRow.index].toggles[virtualColumn.index].enabled
                  }
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
