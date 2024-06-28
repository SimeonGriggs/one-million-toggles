import {z} from 'zod'

export const toggleGroupZ = z.object({
  _id: z.string(),
  toggles: z.array(
    z.object({
      _key: z.string(),
      enabled: z.boolean(),
    }),
  ),
})

export type ToggleGroup = z.infer<typeof toggleGroupZ>

export const toggleGroupsZ = z.array(toggleGroupZ)

export type ToggleGroups = z.infer<typeof toggleGroupsZ>
