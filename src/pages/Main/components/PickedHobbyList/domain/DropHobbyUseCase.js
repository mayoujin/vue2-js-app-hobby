export class DropHobbyUseCase {
  #storage
  constructor({ storage }) {
    this.#storage = storage
  }
  async execute({ hobby }) {
    return await this.#storage.actions.dropHobby(hobby)
  }
}
