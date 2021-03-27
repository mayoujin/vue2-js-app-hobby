import { DecoratorAware } from '@/app/models/DecorationWithProxy'
import { Hobby } from '@/domain/entities/hobby'
import { BaseApplicationModel } from '@/app/models/ObjectWithUUID'

@DecoratorAware
export class Optimistic extends BaseApplicationModel {
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
