import {CheckmarkCircleIcon, CircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const toggleType = defineType({
  name: 'toggle',
  title: 'Toggle',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'enabled',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      enabled: 'enabled',
    },
    prepare({enabled}) {
      return {
        title: enabled ? 'Enabled' : 'Disabled',
        media: enabled ? CheckmarkCircleIcon : CircleIcon,
      }
    },
  },
})
