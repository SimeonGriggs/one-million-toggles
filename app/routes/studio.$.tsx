import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {Studio} from 'sanity'

import {Hydrated} from '~/components/Hydrated'
import studio from '~/styles/studio.css?url'

import config from '../../sanity.config'

export const meta: MetaFunction = () => [
  {title: 'Sanity Studio'},
  {name: 'robots', content: 'noindex'},
]

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: studio}]
}

export const loader = async () => {
  return {
    allowGuestAccess: Boolean(process.env.VERCEL),
  }
}

export default function StudioPage() {
  const {allowGuestAccess} = useLoaderData<typeof loader>()

  return (
    <Hydrated>
      <Studio config={config} unstable_noAuthBoundary={allowGuestAccess} />
    </Hydrated>
  )
}
