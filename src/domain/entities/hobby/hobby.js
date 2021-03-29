import md5 from 'md5'
import { BaseApplicationModel } from '@/app/models/ObjectWithUUID'

export class Hobby extends BaseApplicationModel {
  id
  hobby
  hash
  /**
   * @typedef {{ id?: string, hobby: string }} HobbyDTO
   * @param {HobbyDTO} data
   */
  constructor(data) {
    super()
    this.id = data.id ?? null
    this.hobby = data.hobby
    /**
     *
     */
    this.hash = md5(this.hobby)

    return Object.freeze(this)
  }

  toDTO() {
    return {
      id: this.id,
      hobby: this.hobby,
    }
  }
}
