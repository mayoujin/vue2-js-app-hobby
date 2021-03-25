import md5 from 'md5'
import { v4 as uuidv4 } from 'uuid'

export class Hobby {
  id
  hobby
  uuid
  hash
  /**
   * @typedef {{ id?: string, hobby: string }} HobbyDTO
   * @param {HobbyDTO} data
   */
  constructor(data) {
    this.id = data.id ?? null
    this.hobby = data.hobby
    /**
     *
     */
    this.uuid = uuidv4()
    this.hash = md5(this.hobby)
  }

  toDTO() {
    return {
      id: this.id,
      hobby: this.hobby,
    }
  }
}
