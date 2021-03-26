import { Decorator } from '@/app/models/ProxyDecorator'
import { Hobby } from '@/domain/entities/hobby'
import { v4 as uuidv4 } from 'uuid'

@Decorator
export class HobbyOptimistic {
  uuid
  /**
   * @param {Hobby} hobby
   */
  constructor(hobby) {
    this.uuid = uuidv4()
  }
}

/**
 *
 * @param {Hobby} hobby
 * @return {HobbyOptimistic}
 */
export const createHobbyOptimistic = (hobby) => new HobbyOptimistic(hobby)
