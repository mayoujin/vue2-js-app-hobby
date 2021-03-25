/**
 * Check two hobbies for equality
 *
 * @param {Hobby} hobbyOne
 * @param {Hobby} hobbyTwo
 * @return {boolean}
 */
export const isEqual = (hobbyOne, hobbyTwo) => {
  return hobbyOne.hash === hobbyTwo.hash
}

/**
 *
 * @param {Hobby} hobby
 * @param {Hobby[]} hobbyList
 */
export const ifHobbyInList = (hobby, hobbyList) =>
  hobbyList.some((_hobby) => isEqual(hobby, _hobby))

/**
 * Simple validation exmaple
 * @param {{ hobby?: string }} hobbyData
 */
export const isValidHobbyData = (hobbyData) => {
  return hobbyData?.hobby?.length > 3
}
