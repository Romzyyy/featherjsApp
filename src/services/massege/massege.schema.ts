// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { MassegeService } from './massege.class'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const massegeSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(),
    createdAt: Type.Number(),
    userId: Type.String({ objectid: true }),
    user: Type.Ref(userSchema)
  },
  { $id: 'Massege', additionalProperties: false }
)
export type Massege = Static<typeof massegeSchema>
export const massegeValidator = getValidator(massegeSchema, dataValidator)
export const massegeResolver = resolve<Massege, HookContext<MassegeService>>({})

export const massegeExternalResolver = resolve<Massege, HookContext<MassegeService>>({})

// Schema for creating new entries
export const massegeDataSchema = Type.Pick(massegeSchema, ['text'], {
  $id: 'MassegeData'
})
export type MassegeData = Static<typeof massegeDataSchema>
export const massegeDataValidator = getValidator(massegeDataSchema, dataValidator)
export const massegeDataResolver = resolve<Massege, HookContext<MassegeService>>({
  userId: async (_value, _message, context) => {
    return context.params.user._id
  },
   createdAt: async () => Date.now()
})

// Schema for updating existing entries
export const massegePatchSchema = Type.Partial(massegeSchema, {
  $id: 'MassegePatch'
})
export type MassegePatch = Static<typeof massegePatchSchema>
export const massegePatchValidator = getValidator(massegePatchSchema, dataValidator)
export const massegePatchResolver = resolve<Massege, HookContext<MassegeService>>({
  user: virtual(async (message, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(message.userId)
  })
})

// Schema for allowed query properties
export const massegeQueryProperties = Type.Pick(massegeSchema, ['_id', 'text'])
export const massegeQuerySchema = Type.Intersect(
  [
    querySyntax(massegeQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MassegeQuery = Static<typeof massegeQuerySchema>
export const massegeQueryValidator = getValidator(massegeQuerySchema, queryValidator)
export const massegeQueryResolver = resolve<MassegeQuery, HookContext<MassegeService>>({})
