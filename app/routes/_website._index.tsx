import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import React from 'react'

import {SanityLive} from '~/components/SanityLive'
import {Toggle} from '~/components/Toggle'
import {client} from '~/sanity/client'
import {TOGGLE_GROUPS_QUERY} from '~/sanity/queries'
import type {ToggleGroup} from '~/types/toggleGroup'

export const meta: MetaFunction<typeof loader> = ({data}) => {
  let count = 0

  if (data) {
    for (let groupIndex = 0; groupIndex < data.initial.length; groupIndex++) {
      for (
        let toggleIndex = 0;
        toggleIndex < data.initial[groupIndex].toggles.length;
        toggleIndex++
      ) {
        count++
      }
    }
  }

  const title = count === 1 ? `One Toggle` : `${count} Toggles`

  return [{title}]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  let syncTags: string[] | undefined = []
  let lastLiveEventId: string | null = new URL(request.url).searchParams.get(
    'lastLiveEventId',
  )

  const initial = await client
    .fetch<
      ToggleGroup[]
    >(TOGGLE_GROUPS_QUERY, {}, {filterResponse: false, lastLiveEventId})
    .then((res) => {
      syncTags = res.syncTags
      return res.result
    })

  return {initial, syncTags}
}

export default function Index() {
  const {initial, syncTags} = useLoaderData<typeof loader>()

  return (
    <>
      <SanityLive syncTags={syncTags} />
      <div className="flex flex-wrap gap-3 p-3 justify-center">
        {initial.map((group) => (
          <React.Fragment key={group._id}>
            {group.toggles.map((toggle) => (
              <Toggle
                key={toggle._key}
                _id={group._id}
                _key={toggle._key}
                enabled={toggle.enabled}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
