import type {LoaderFunctionArgs} from '@remix-run/node'
import {json, Outlet, useLoaderData, useOutletContext} from '@remix-run/react'
import {VisualEditing} from '@sanity/visual-editing/remix'
import {lazy, Suspense} from 'react'

import {Header} from '~/components/Header'
import {client} from '~/sanity/client'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {SITE_META_QUERY} from '~/sanity/queries'
import type {ThemePreference} from '~/types/themePreference'

const SanityLiveMode = lazy(() => import('~/components/SanityLiveMode'))
const ExitPreview = lazy(() => import('~/components/ExitPreview'))

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {preview} = await loadQueryOptions(request.headers)
  const siteMeta = await client.fetch(SITE_META_QUERY)

  return json({
    siteMeta,
    sanity: {preview},
  })
}

export default function Website() {
  const {siteMeta, sanity} = useLoaderData<typeof loader>()
  const {theme} = useOutletContext<{theme: ThemePreference}>()

  return (
    <>
      <Header theme={theme} content={siteMeta.content} />
      <Outlet />
      {sanity.preview ? (
        <Suspense>
          <SanityLiveMode />
          <ExitPreview />
          <VisualEditing />
        </Suspense>
      ) : null}
    </>
  )
}
