import {DesktopIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteMetaType = defineType({
  name: 'siteMeta',
  title: 'Site Meta',
  type: 'document',
  icon: DesktopIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
