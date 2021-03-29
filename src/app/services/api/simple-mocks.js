export const mockApiResponse = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), 3000)
  })

const pickedHobbiesData = [
  { id: 1, hobby: 'Программирование' },
  { id: 2, hobby: 'Плавание' },
]

const optionalHobbiesData = [
  { id: 1, hobby: 'Программирование' },
  { id: 2, hobby: 'Комиксы' },
]

export const pickedHobbiesDataResponseMock = () => {
  return mockApiResponse(pickedHobbiesData)
}

export const optionalHobbiesDataResponseMock = () => {
  return mockApiResponse(optionalHobbiesData)
}

export const pickOrAddHobbyResponseMock = (hobbyDTO) => {
  const responseHobbyDTO = {
    ...hobbyDTO,
    id: Date.now(),
  }
  return mockApiResponse(responseHobbyDTO)
}
