import {CheckmarkCircleIcon, CircleIcon} from '@sanity/icons'
import {Card, Flex} from '@sanity/ui'

export function ToggleIcon({enabled}: {enabled: boolean}) {
  return (
    <Card
      padding={1}
      tone={enabled ? 'positive' : 'transparent'}
      style={{aspectRatio: 1}}
    >
      <Flex align="center" justify="center" style={{aspectRatio: 1}}>
        {enabled ? <CheckmarkCircleIcon /> : <CircleIcon />}
      </Flex>
    </Card>
  )
}
