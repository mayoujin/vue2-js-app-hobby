import { v4 as uuidv4 } from 'uuid'
import {IBaseModel} from "@/app/models/ObjectWithUUID.type"

export class BaseModel implements IBaseModel {
  readonly #uuid: string
  constructor() {
    this.#uuid = uuidv4()
  }
  get uuid() {
    return this.#uuid
  }
}
