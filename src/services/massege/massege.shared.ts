// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Massege, MassegeData, MassegePatch, MassegeQuery, MassegeService } from './massege.class'

export type { Massege, MassegeData, MassegePatch, MassegeQuery }

export type MassegeClientService = Pick<MassegeService<Params<MassegeQuery>>, (typeof massegeMethods)[number]>

export const massegePath = 'massege'

export const massegeMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const massegeClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(massegePath, connection.service(massegePath), {
    methods: massegeMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [massegePath]: MassegeClientService
  }
}
