import {type ActionFunctionArgs, json} from '@remix-run/node'

import {client} from '~/sanity/client'

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()
  const {enabled, _id, _key} = Object.fromEntries(formData.entries())
  const nowEnabled = enabled.toString() === 'true'

  if (!_id || !_key) {
    return new Response('Bad request', {status: 400})
  }

  await client
    .withConfig({
      token: process.env.SANITY_WRITE_TOKEN,
    })
    .patch(_id.toString())
    .set({
      [`toggles[_key == "${_key.toString()}"].enabled`]: nowEnabled,
    })
    .commit()

  return json({enabled: nowEnabled})
}
