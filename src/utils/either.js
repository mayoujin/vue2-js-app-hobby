import { ok, err, Result } from 'resulty'

/**
 *
 * @param fn
 * @return {Promise<Result<unknown, *>|Result<*, unknown>>}
 */
export const eitherFromPromise = async (fn) => {
  try {
    return ok(await fn())
  } catch (error) {
    return err(error)
  }
}
