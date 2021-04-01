import md5 from 'md5'
import { BaseModel } from '@/app/models/ObjectWithUUID'
import { IHobby, IHobbyData } from '@/domain/entities/hobby/hobby.types'

/**
 *
 */
export class Hobby extends BaseModel implements IHobby {
  id
  hobby
  hash
  /**
   * @param {IHobbyData} data
   */
  constructor(data) {
    super()
    this.id = data.id ?? null
    this.hobby = data.hobby
    /**
     *
     */
    this.hash = md5(this.hobby)

    return this
  }

  toDTO() {
    return {
      id: this.id,
      hobby: this.hobby,
    }
  }
}
