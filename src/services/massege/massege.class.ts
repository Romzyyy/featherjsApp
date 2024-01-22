// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Massege, MassegeData, MassegePatch, MassegeQuery } from './massege.schema'

export type { Massege, MassegeData, MassegePatch, MassegeQuery }

export interface MassegeParams extends MongoDBAdapterParams<MassegeQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class MassegeService<ServiceParams extends Params = MassegeParams> extends MongoDBService<
  Massege,
  MassegeData,
  MassegeParams,
  MassegePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('massege'))
  }
}
