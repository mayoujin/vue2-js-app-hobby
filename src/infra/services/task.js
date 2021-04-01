import { ok, err, Result } from 'resulty'
import { DecoratorAware } from '@/app/models/DecorationWithProxy'
import { createTaskStateObservable } from '@/infra/services/state-observable'

/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
export class CompleteSignal extends EventTarget {
  /**
   *
   */
  #isCompleted = false

  /**
   *
   */
  constructor(...args) {
    super(...args)
    this.addEventListener('complete', () => {
      this.#isCompleted = true
    })
  }

  get isCompleted() {
    return this.#isCompleted
  }
}

const TaskStatuses = Object.freeze({
  STANDBY: 0,
  RUNNING: 5,
  SUCCEEDED: 10,
  FAILED: -10,
})

const processResult = ({ result, error, state }) => {
  if (result) {
    state.result = result
    state.status = TaskStatuses.SUCCEEDED
  }

  if (error) {
    state.status = TaskStatuses.FAILED
    state.error = error
  }

  return result
}

export class Task {
  #command
  #signal
  #awaitQueue = []

  /**
   *
   * @param command
   */
  constructor(command) {
    this.#command = command
    this.#signal = new CompleteSignal()
  }

  #complete() {
    const event = new CustomEvent('complete')
    this.#signal.dispatchEvent(event)
  }
  /**
   *
   * @param args
   * @return {Promise<*|Result<Hobby, Error>|*>}
   */
  async run(...args) {
    if (this.#signal.isCompleted) {
      throw new Error('Task already run')
    }

    await Promise.all(this.#awaitQueue)

    try {
      if (typeof this.#command === 'function') {
        return this.#command(...args)
      }
      return this.#command.execute(...args)
    } finally {
      this.#complete()
    }
  }

  get signal() {
    return this.#signal
  }

  get isCompleted() {
    return this.#signal.isCompleted
  }

  wait(task) {
    this.#awaitQueue.push(
      new Promise((resolve) => {
        task.signal.addEventListener('complete', () => {
          resolve()
        })
      }),
    )
  }
}

/**
 *
 */
export class CancelableTask {
  #controller
  constructor(task) {
    this.#controller = new AbortController()
    task.signal(this.#controller.signal)
  }
  abort() {
    return this.#controller.abort()
  }
}

/**
 *
 */
//@DecoratorAware
export class StatefullTask extends Task {
  #task
  #state

  /**
   *
   * @param command
   * @param {TaskState} state
   */
  constructor(
    command,
    state = createTaskStateObservable({ status: TaskStatuses.STANDBY }),
  ) {
    super(command)
    this.#state = state
  }

  /**
   *
   * @param args
   * @return {Promise<*>}
   */
  async run(...args) {
    try {
      this.#state.status = TaskStatuses.RUNNING
      const result = await super.run(...args)
      if (result instanceof Result) {
        return result.cata({
          Ok: () => processResult({ result, state: this.#state }),
          Err: (error) => processResult({ error, state: this.#state }),
        })
      }
      return processResult({ result, state: this.#state })
    } catch (error) {
      processResult({ error, state: this.#state })
      throw error
    }
  }

  /**
   *
   * @return {boolean}
   */
  get isRunning() {
    return this.#state.status === TaskStatuses.RUNNING
  }
  /**
   *
   * @return {boolean}
   */
  get hasError() {
    return this.#state.status === TaskStatuses.FAILED
  }

  /**
   *
   * @return {TaskState}
   */
  get state() {
    return this.#state
  }
}

/**
 *
 * @return {StatefullTask}
 */
export const withStateAwareTask = () => {
  return StatefullTask
}

/**
 *
 */
export class TransactionAwareTask {
  #task
  #commit
  #rollback
  constructor(task, { commit, rollback }) {
    this.#task = task
    this.#commit = commit
    this.#rollback = rollback
  }

  run(...args) {
    try {
      const result = this.#task.run(...args)
      this.#commit(result)
      return result
    } catch (e) {
      this.#rollback(e)
      throw e
    }
  }

  setCommit(commitFunction) {
    this.#commit = commitFunction
  }
  setRollback(rollBackFunction) {
    this.#rollback = rollBackFunction
  }
}

/**
 *
 * @param command
 * @param {TaskState} [state]
 * @return {StatefullTask}
 */
export const createStatefullTask = (command, state) => {
  return new StatefullTask(command, state)
}

export * from './state-observable'
