import { createTaskStateObservable } from '@/infra/services/state-observable'

export class Task {
  #command
  constructor(command) {
    this.#command = command
  }
  run(...args) {
    return this.#command.execute(...args)
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
export class StateAwareTask {
  #task
  #state
  constructor(task, state = createTaskStateObservable()) {
    this.#task = task
    this.#state = state
  }
  async run(...args) {
    try {
      this.#state.status = 'running'
      const result = await this.#task.run(...args)
      this.#state.status = 'complete'
      this.#state.result = result
      return result
    } catch (error) {
      this.#state.status = 'failed'
      this.#state.error = error
      throw error
    }
  }
  get isRunning() {
    return this.#state.status === 'running'
  }
}

/**
 *
 * @return {StateAwareTask}
 */
export const withStateAwareTask = () => {
  return StateAwareTask
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

export * from './state-observable'
