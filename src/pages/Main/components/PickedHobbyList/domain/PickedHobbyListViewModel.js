import Vue from 'vue'
import { ifHobbyInList } from '@/domain/entities/hobby'
import { Optimistic } from '@/app/models/Optimistic'
import { StateAwareTask, Task } from '@/infra/services'
import { AddNewHobbyUseCase } from '@/pages/Main/components/PickedHobbyList/domain/AddNewHobbyUseCase'
import { DropHobbyUseCase } from '@/pages/Main/components/PickedHobbyList/domain/DropHobbyUseCase'
import { queryHobbies } from '@/store/apollo'

const buildHobbyMeta = (hobby, hobbyList) => ({
  [hobby.uuid]: {
    isPicked: ifHobbyInList(hobby, hobbyList),
    isOptimistic: hobby instanceof Optimistic,
  },
})

class AddNewHobbyTask extends Task {}
class DropHobbyTask extends Task {}

/**
 *
 */
export class PickedHobbyListViewModel {
  #storage
  #tasks = new Map()

  constructor({ storage }) {
    this.#storage = storage
    this.#setTasks()
  }

  /**
   *
   */
  #setTasks() {
    this.#tasks.set(
      this.addNewHobby,
      new StateAwareTask(
        new AddNewHobbyTask(
          new AddNewHobbyUseCase({
            storage: this.#storage,
          }),
        ),
      ),
    )

    this.#tasks.set(
      this.dropHobby,
      new StateAwareTask(
        new DropHobbyTask(new DropHobbyUseCase({ storage: this.#storage })),
      ),
    )
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
   * @param hobby
   * @return {Promise<Result<boolean, Error>>}
   */
  async dropHobby(hobby) {
    const result = await this.#tasks.get(this.dropHobby).run({ hobby })
    return result
  }

  /**
   *
   * @param {string} rawHobbyString
   * @return {Promise<Result<Hobby, Error>>}
   */
  async addNewHobby(rawHobbyString) {
    this.isAddError = false
    const result = await this.#tasks
      .get(this.addNewHobby)
      .run({ rawHobbyString })

    return result
  }

  get tasks() {
    return this.#tasks
  }
}
