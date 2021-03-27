import { v4 as uuidv4 } from 'uuid'

export class BaseApplicationModel {
  uuid
  constructor() {
    this.uuid = uuidv4()
  }
}
