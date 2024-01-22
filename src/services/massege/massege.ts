// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  massegeDataValidator,
  massegePatchValidator,
  massegeQueryValidator,
  massegeResolver,
  massegeExternalResolver,
  massegeDataResolver,
  massegePatchResolver,
  massegeQueryResolver
} from './massege.schema'

import type { Application } from '../../declarations'
import { MassegeService, getOptions } from './massege.class'
import { massegePath, massegeMethods } from './massege.shared'

export * from './massege.class'
export * from './massege.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const massege = (app: Application) => {
  // Register our service on the Feathers application
  app.use(massegePath, new MassegeService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: massegeMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(massegePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(massegeExternalResolver),
        schemaHooks.resolveResult(massegeResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(massegeQueryValidator), schemaHooks.resolveQuery(massegeQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(massegeDataValidator), schemaHooks.resolveData(massegeDataResolver)],
      patch: [schemaHooks.validateData(massegePatchValidator), schemaHooks.resolveData(massegePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [massegePath]: MassegeService
  }
}
