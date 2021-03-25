import { Hobby } from '@/domain/entities/hobby'
import { v4 as uuidv4 } from 'uuid'

export class HobbyOptimistic {
  uuid
  #hobby

  status
  statusText
  /**
   * @param {Hobby} hobby
   */
  constructor(hobby) {
    this.#hobby = hobby
    this.uuid = uuidv4()
  }

  get id() {
    return this.#hobby.id
  }
  get hobby() {
    return this.#hobby.hobby
  }
  get hash() {
    return this.#hobby.hash
  }

  get original() {
    return this.#hobby
  }
}

/**
 *
 * @param {Hobby} hobby
 * @return {HobbyOptimistic}
 */
export const createHobbyOptimistic = (hobby) => new HobbyOptimistic(hobby)
