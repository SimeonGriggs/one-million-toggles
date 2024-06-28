import type {LoaderFunctionArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {SanityLive} from '~/components/SanityLive'
import {Toggles} from '~/components/Toggles'
import {client} from '~/sanity/client'
import {TOGGLE_GROUPS_QUERY} from '~/sanity/queries'
import type {ToggleGroup} from '~/types/toggleGroup'

// export const meta: MetaFunction<
//   typeof loader,
//   {
//     'routes/_website': typeof layoutLoader
//   }
// > = ({matches}) => {
//   const layoutData = matches.find(
//     (match) => match.id === `routes/_website`,
//   )?.data
//   const home = layoutData ? layoutData.initial.data : null
//   const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

//   return [{title}]
// }

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
      <Toggles toggles={initial} />
    </>
  )
}
