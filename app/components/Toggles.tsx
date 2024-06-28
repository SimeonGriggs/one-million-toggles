import React from 'react'

import {Toggle} from '~/components/Toggle'
import type {ToggleGroup} from '~/types/toggleGroup'

type TogglesProps = {
  toggles: ToggleGroup[]
}

export function Toggles(props: TogglesProps) {
  return (
    <div className="flex flex-wrap gap-3 p-3 justify-center">
      {props.toggles.map((toggleGroup) => (
        <React.Fragment key={toggleGroup._id}>
          {toggleGroup.toggles.map((toggle) => (
            <Toggle
              key={toggle._key}
              enabled={toggle.enabled}
              _id={toggleGroup._id}
              _key={toggle._key}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}
