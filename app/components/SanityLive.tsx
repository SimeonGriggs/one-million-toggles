import {useFetcher} from '@remix-run/react'
import {useEffect} from 'react'

import type {loader as websiteIndexLoader} from '~/routes/_website._index'
import {client} from '~/sanity/client'

type SanityLiveProps = {
  syncTags: string[]
  setData: (data: any) => void
}

export function SanityLive({syncTags = [], setData}: SanityLiveProps) {
  const fetcher = useFetcher<typeof websiteIndexLoader>({key: 'sanity-live'})

  useEffect(() => {
    const subscription = client
      .withConfig({apiVersion: 'vX'})
      .live.events()
      .subscribe((event) => {
        if (
          event.type === 'message' &&
          event.tags.some((t) => syncTags.includes(t))
        ) {
          // This will perform a GET request to the current URL with a search param
          // But it will not revalidate the loader, the updated data is returned to fetcher.data
          fetcher.submit(
            {lastLiveEventId: event.id},
            {action: '/?index', method: 'GET'},
          )
        }
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [fetcher, syncTags])

  // Fetcher does not revalidate, so we need to do it manually
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data.initial)
      // Causes infinite loop
      // revalidator.revalidate()
    }
  }, [fetcher.data, setData])

  return null
}
