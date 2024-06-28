import {CheckmarkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import type {ToggleGroup} from '~/types/toggleGroup'

import {ToggleGroupIcon} from './ToggleGroupIcon'

export const toggleGroupType = defineType({
  name: 'toggleGroup',
  title: 'Toggle Group',
  type: 'document',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'toggles',
      type: 'array',
      of: [{type: 'toggle'}],
    }),
  ],
  preview: {
    select: {
      _id: '_id',
      toggles: 'toggles',
    },
    prepare({_id, toggles = []}) {
      const count = toggles.length
      const enabledCount = toggles.filter(
        (t: ToggleGroup['toggles'][0]) => t.enabled,
      ).length

      return {
        title: _id,
        subtitle: `${enabledCount}/${count} enabled`,
        media: ToggleGroupIcon({toggles}),
      }
    },
  },
})
