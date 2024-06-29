import {Switch} from '@headlessui/react'
import {useFetcher} from '@remix-run/react'
import React, {useCallback} from 'react'

type ToggleProps = {
  enabled: boolean
  _key: string
  _id: string
}

function ToggleComponent(props: ToggleProps) {
  const fetcher = useFetcher<{enabled: boolean}>()
  let enabled = props.enabled

  if (fetcher.formData) {
    enabled = Boolean(fetcher.formData.get('enabled'))
  } else if (fetcher.data) {
    enabled = Boolean(fetcher.data.enabled)
  }

  // Had to do this because of a bug with <Switch> not submitting on click
  const handleChange = useCallback(
    (value: boolean) => {
      return fetcher.submit(
        {
          _id: props._id,
          _key: props._key,
          enabled: value,
        },
        {
          action: '/resource/toggle',
          method: 'POST',
        },
      )
    },
    [fetcher, props._id, props._key],
  )

  return (
    <fetcher.Form method="POST" action="/resource/toggle">
      <input type="hidden" name="_key" value={props._key} />
      <input type="hidden" name="_id" value={props._id} />
      <Switch
        // Bug: Submit only works with keyboard, not click
        // https://github.com/tailwindlabs/headlessui/issues/3343
        // type="submit"
        checked={enabled}
        onChange={handleChange}
        name="enabled"
        className="group inline-flex h-5 w-9 items-center rounded-full dark:bg-gray-700 bg-gray-200 transition data-[checked]:bg-green-400 dark:data-[checked]:bg-green-700"
      >
        <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-5" />
      </Switch>
    </fetcher.Form>
  )
}

const areEqual = (prevProps: ToggleProps, nextProps: ToggleProps) => {
  // Only re-render if the enabled prop has changed
  return prevProps.enabled === nextProps.enabled
}

export const Toggle = React.memo(ToggleComponent, areEqual)
