import { DecoratorAware } from '@/app/models/DecorationWithProxy'
import { Hobby } from '@/domain/entities/hobby'
import { BaseModel } from '@/app/models/ObjectWithUUID'

@DecoratorAware
export class Optimistic extends BaseModel {
  /**
   *
   * @param {Hobby} hobby
   */
  constructor(hobby) {
    super()
  }
}

/**
 *
 * @param {Hobby} hobby
 * @return {Optimistic}
 */
export const createHobbyOptimistic = (hobby) => new Optimistic(hobby)
