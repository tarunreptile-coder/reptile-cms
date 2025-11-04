export default class _Semaphore {
    private _locked = false;

    private readonly _event = new EventTarget();

    /**
     * Waits for the semaphore to be released.
     * @param timeout Optional. Timeout in milliseconds.
     * If the semaphore is not released in given time throws an error.
     * @returns Awaitable object
     */
    wait(timeout?: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const successCb = () => {
                this._event.removeEventListener('release', successCb);
                resolve();
            }

            const errorCb = () => {
                reject(new Error('Semaphore wait timeout'));
            }

            if (timeout) {
                setTimeout(errorCb, timeout);
            }

            this._event.addEventListener('release', successCb);
        });
    }

    /**
     * If the semaphore is locked waits for the release and locks it.
     * Otherwise locks the semaphore and continues with the execution.
     * @param timeout Optional. Timeout in milliseconds.
     * If the semaphore is not released in given time throws an error.
     * @returns Awaitable object
     */
    async acquire(timeout?: number): Promise<void> {
        while (this._locked) {
            await this.wait(timeout);
        }

        this._locked = true;
    }

    /**
     * Releases the lock on semaphore.
     */
    release(): void {
        this._locked = false;
        this._event.dispatchEvent(new Event('release'));
    }
}
