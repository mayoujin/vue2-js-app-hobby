import { err } from 'resulty'
import { isValidHobbyData } from '@/domain/entities/hobby'

/**
 * @param {string} hobbyName
 * @return {string}
 */
const sanitizeHobbyName = (hobbyName) => {
  return hobbyName.trim()
}

/**
 * @param {string} hobbyName
 * @return {{hobby: string}}
 */
const buildHobbyData = (hobbyName) => {
  const name = sanitizeHobbyName(hobbyName)
  const hobbyData = { hobby: name }
  return hobbyData
}

export class AddNewHobbyUseCase {
  #storage
  constructor({ storage }) {
    this.#storage = storage
  }

  /**
   *
   * @param rawHobbyString
   * @return {Promise<Result<Hobby, Error>|*>}
   */
  async execute({ rawHobbyString }) {
    const hobbyData = buildHobbyData(rawHobbyString)

    if (false === isValidHobbyData(hobbyData)) {
      return err(
        new Error(
          'Неверное значение для хобби (слишком короткое или длинное, и т.п.)',
        ),
      )
    }

    return await this.#storage.actions.addNewHobby(hobbyData)
  }
}
