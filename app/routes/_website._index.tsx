import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import React, {useState} from 'react'

import {SanityLive} from '~/components/SanityLive'
import {Toggles} from '~/components/Toggles'
import {client} from '~/sanity/client'
import {TOGGLE_GROUPS_QUERY} from '~/sanity/queries'
import type {ToggleGroup} from '~/types/toggleGroup'

export const meta: MetaFunction<typeof loader> = ({data}) => {
  if (!data) {
    return [{title: 'Loading...'}]
  }

  const countFormatted = new Intl.NumberFormat().format(data.count)
  const title = data.count === 1 ? `One Toggle` : `${countFormatted} Toggles`

  return [{title}]
}

export const shouldRevalidate = false

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

  let count = 0

  for (let gIndex = 0; gIndex < initial.length; gIndex++) {
    for (let tIndex = 0; tIndex < initial[gIndex].toggles.length; tIndex++) {
      count++
    }
  }

  return {initial, count, syncTags}
}

export default function Index() {
  const {initial, syncTags} = useLoaderData<typeof loader>()
  const [data, setData] = useState(initial)

  return (
    <>
      <SanityLive syncTags={syncTags} setData={setData} />
      <Toggles data={data} />
    </>
  )
}
