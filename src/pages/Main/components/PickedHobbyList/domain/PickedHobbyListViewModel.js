import { ifHobbyInList } from '@/domain/entities/hobby'
import { HobbyOptimistic } from '@/app/models/HobbyOptimistic'
import { AddNewHobbyUseCase } from '@/pages/Main/components/PickedHobbyList/domain/AddNewHobbyUseCase'
import { createTaskStateObservable, StateAwareTask, Task } from '@/app/services'
import { DropHobbyUseCase } from '@/pages/Main/components/PickedHobbyList/domain/DropHobbyUseCase'

const buildHobbyMeta = (hobby, hobbyList) => ({
  [hobby.uuid]: {
    isPicked: ifHobbyInList(hobby, hobbyList),
    isOptimistic: hobby instanceof HobbyOptimistic,
  },
})

/**
 *
 */
export class PickedHobbyListViewModel {
  #state
  #storage
  #tasks = new Map()

  isBusy = false

  constructor({ state, storage }) {
    this.#state = state
    this.#storage = storage
    this.#initTasks()
  }
  get pickedHobbies() {
    return this.#storage.getters.pickedHobbies
  }
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

  #initTasks() {
    const addNewHobbyUseCase = new AddNewHobbyUseCase({
      storage: this.#storage,
    })
    debugger
    this.#tasks.set(
      this.addNewHobby,
      new StateAwareTask(
        new Task(addNewHobbyUseCase),
        createTaskStateObservable(),
      ),
    )

    const dropHobbyUseCase = new DropHobbyUseCase({ storage: this.#storage })
    this.#tasks.set(
      this.dropHobby,
      new StateAwareTask(
        new Task(dropHobbyUseCase),
        createTaskStateObservable(),
      ),
    )
  }

  get tasks() {
    return this.#tasks
  }
}
