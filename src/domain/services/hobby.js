//import { apiClient } from '@/api'
//import { create as createRequest } from '@/api/FrontendApiRequest'
import { Hobby } from '@/domain/entities/hobby'
import {
  optionalHobbiesDataResponseMock,
  pickedHobbiesDataResponseMock,
  pickOrAddHobbyResponseMock,
} from '@/domain/services/simple-mocks'

/**
 * Fetch picked hobby list
 * @return {Promise<Hobby[]>}
 */
export const getPickedHobbies = async () => {
  //const hobbiesRequest = createRequest('/hobbies')
  //const hobbiesDataRequest = async () => apiClient.request(hobbiesRequest)
  const hobbiesData = await pickedHobbiesDataResponseMock()
  const hobbies = hobbiesData.map((hobbyData) => new Hobby(hobbyData))

  return hobbies
}

/**
 * Fetch optional available hobby list
 * @return {Promise<Hobby[]>}
 */
export const getOptionalHobbies = async () => {
  //const hobbiesRequest = createRequest('/hobbies')
  //const hobbiesDataRequest = async () => apiClient.request(hobbiesRequest)
  const hobbiesData = await optionalHobbiesDataResponseMock()
  const hobbies = hobbiesData.map((hobbyData) => new Hobby(hobbyData))

  return hobbies
}
/**
 * @typedef {{ id?: string, hobby: string }} HobbyDTO
 * @param {HobbyDTO} hobbyDTO
 * @return {Promise<Hobby>}
 */
export const addNewHobby = async (hobbyDTO) => {
  console.info(`Adding New Hobby:[${hobbyDTO.hobby}]...`)
  return new Hobby(await pickOrAddHobbyResponseMock(hobbyDTO))
}

/**
 *
 * @param {Hobby} hobby
 * @return {Promise<Hobby>}
 */
export const pickHobby = async (hobby) => {
  console.info(`Picking Hobby:[${hobby.hobby}]...`)
  return new Hobby(await pickOrAddHobbyResponseMock(hobby.toDTO()))
}

/**
 *
 * @param {Hobby} hobby
 * @return {Promise<Hobby>}
 */
export const dropHobby = async (hobby) => {
  console.info(`Deleting Hobby:[${hobby.hobby}]...`)
  return new pickOrAddHobbyResponseMock(true)
}
