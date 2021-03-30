import Vue from 'vue'

export class BaseViewModel {
  #state = Vue.observable({
    tasks: [],
  })

  /**
   *
   */
  enqueueTask(taskId, task) {
    this.#state.tasks = this.#state.tasks.concat({ taskId, task })
    task.signal.addEventListener('complete', () => this.dequeueTask(task))
  }

  /**
   *
   * @param {Task} task
   */
  dequeueTask(task) {
    this.#state.tasks = this.#state.tasks.filter(
      ({ task: _task }) => task !== _task,
    )
  }

  /**
   *
   * @param id
   * @return {*}
   */
  getTaskByAction(id) {
    const { task } = this.#state.tasks.find(({ taskId }) => taskId === id) ?? {}
    return task
  }

  /**
   *
   * @param id
   * @return {*[]}
   */
  getTasksByAction(id) {
    return this.#state.tasks
      .filter(({ taskId }) => taskId === id)
      .map(({ task }) => task)
  }
}
