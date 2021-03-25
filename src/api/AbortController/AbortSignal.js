/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
export default class AbortSignal extends EventTarget {
	/**
	 *
	 */
	#aborted;

	/**
	 *
	 */
	constructor(...args) {
		super(...args);
		this.addEventListener('abort', () => {
			this.#aborted = true;
		});
	}

	get aborted() {
		return this.#aborted;
	}
}
