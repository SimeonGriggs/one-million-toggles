import type {LoaderFunctionArgs} from '@remix-run/node'
import {json, Outlet, useLoaderData, useOutletContext} from '@remix-run/react'
import {VisualEditing} from '@sanity/visual-editing/remix'
import {lazy, Suspense} from 'react'

import {Header} from '~/components/Header'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import type {ThemePreference} from '~/types/themePreference'

const SanityLiveMode = lazy(() => import('~/components/SanityLiveMode'))
const ExitPreview = lazy(() => import('~/components/ExitPreview'))

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {preview} = await loadQueryOptions(request.headers)

  return json({
    sanity: {preview},
  })
}

export default function Website() {
  const {sanity} = useLoaderData<typeof loader>()
  const {theme} = useOutletContext<{theme: ThemePreference}>()

  return (
    <>
      <Header theme={theme} />
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
