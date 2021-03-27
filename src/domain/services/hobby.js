import { apiClient } from '@/api'
import { create as createRequest } from '@/api/FrontendApiRequest'
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
  const hobbiesRequest = createRequest('/hobbies-picked')
  //const hobbyListData = await pickedHobbiesDataResponseMock()
  const hobbyListData = await apiClient.request(hobbiesRequest)
  const hobbies = hobbyListData.map((hobbyData) => new Hobby(hobbyData))

  return hobbies
}

/**
 * Fetch optional available hobby list
 * @return {Promise<Hobby[]>}
 */
export const getOptionalHobbies = async () => {
  const hobbiesRequest = createRequest('/hobbies-optional')
  const hobbyListData = await apiClient.request(hobbiesRequest)
  //const hobbyListData = await optionalHobbiesDataResponseMock()
  const hobbies = hobbyListData.map((hobbyData) => new Hobby(hobbyData))

  return hobbies
}
/**
 * @typedef {{ id?: string, hobby: string }} HobbyDTO
 * @param {HobbyDTO} hobbyDTO
 * @return {Promise<Hobby>}
 */
export const addNewHobby = async (hobbyDTO) => {
  console.info(`Adding New Hobby:[${hobbyDTO.hobby}]...`)
  const hobbyAddRequest = createRequest('/hobbies-picked', hobbyDTO, {
    method: 'POST',
  })
  const hobbyData = await apiClient.request(hobbyAddRequest)

  //return new Hobby(await pickOrAddHobbyResponseMock(hobbyDTO))
  return new Hobby(hobbyData)
}

/**
 *
 * @param {Hobby} hobby
 * @return {Promise<Hobby>}
 */
export const pickHobby = async (hobby) => {
  console.info(`Picking Hobby:[${hobby.hobby}]...`)
  const hobbyAddRequest = createRequest('/hobbies-picked', hobby.toDTO(), {
    method: 'POST',
  })
  const hobbyData = await apiClient.request(hobbyAddRequest)

  return new Hobby(hobbyData)
}

/**
 *
 * @param {Hobby} hobby
 * @return {Promise<Hobby>}
 */
export const dropHobby = async (hobby) => {
  console.info(`Deleting Hobby:[${hobby.hobby}]...`)
  const hobbyDropRequest = createRequest(
    `/hobbies-picked/${hobby.toDTO().id}`,
    {},
    {
      method: 'DELETE',
    },
  )
  await apiClient.request(hobbyDropRequest)
  //return new pickOrAddHobbyResponseMock(true)
  return hobby
}
