export * from './either'
/**
 *
 * @param exception
 * @throw {Error}
 * @return void
 */
export const throwAsyncException = async (exception) => {
  setTimeout(() => throw exception)
}
