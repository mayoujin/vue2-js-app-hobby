import { createStatefullTask } from '@/infra/services'
import { Optimistic } from '@/app/models/Optimistic'
import { ifHobbyInList } from '@/domain/entities/hobby'
import { BaseViewModel } from '@/pages/Main/components/PickedHobbyList/domain/BaseViewModel'
import { AddNewHobbyUseCase } from '@/pages/Main/components/PickedHobbyList/domain/AddNewHobbyUseCase'
import { DropHobbyUseCase } from '@/pages/Main/components/PickedHobbyList/domain/DropHobbyUseCase'

const buildHobbyMeta = (hobby, hobbyList) => ({
  [hobby.uuid]: {
    isPicked: ifHobbyInList(hobby, hobbyList),
    isOptimistic: hobby instanceof Optimistic,
  },
})

/**
 *
 */
export class PickedHobbyListViewModel extends BaseViewModel {
  #storage

  /**
   *
   * @param storage
   * @param state
   */
  constructor({ storage } = {}) {
    super()
    if (storage) {
      this.#storage = storage
    }
  }

  /**
   *
   * @return {any}
   */
  get pickedHobbies() {
    return this.#storage.getters.pickedHobbies
  }

  /**
   *
   * @return {*}
   */
  get meta() {
    return this.pickedHobbies.reduce(
      (acc, hobby) => ({
        ...acc,
        ...buildHobbyMeta(hobby, this.#storage.getters.optionalHobbies),
      }),
      {},
    )
  }

  /**
   *
   * @return {Promise<Result<Error|Hobby[]>>}
   */
  async fetchHobbies() {
    return await this.#storage.actions.fetchPickedHobbies()
  }

  /**
   *
   * @param {Hobby} hobby
   * @return {Promise<Result<boolean, Error>>}
   */
  async dropHobby(hobby) {
    const task = createStatefullTask(
      new DropHobbyUseCase({ storage: this.#storage }),
    )
    this.enqueueTask(this.dropHobby, task)
    const result = await task.run({ hobby })

    return result
  }

  /**
   *
   * @param {string} rawHobbyString
   * @return {Promise<Result<Hobby, Error>>}
   */
  async addNewHobby(rawHobbyString) {
    const task = createStatefullTask(
      new AddNewHobbyUseCase({
        storage: this.#storage,
      }),
    )

    this.enqueueTask(this.addNewHobby, task)
    const result = await task.run({ rawHobbyString })

    return result
  }
}
