import { apolloClient } from 'boot/apollo-client'
import { err } from 'resulty'
import { isValidHobbyData } from '@/domain/entities/hobby'
import { hobby as hobbyService } from '@/app/services/api'

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
  /**
   * @typedef {import('apollo-client').ApolloClient} ApolloClient
   * @type ApolloClient
   */
  #apollo
  #service
  constructor({ storage, apollo = apolloClient, service = hobbyService }) {
    this.#storage = storage
    this.#apollo = apollo
    this.#service = service
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

    const callServiceThunk = async (hobbyData) =>
      this.#service.addNewHobby(hobbyData)

    const result = await this.#storage.actions.addNewHobby(
      hobbyData,
      callServiceThunk,
    )

    return result
  }
}
