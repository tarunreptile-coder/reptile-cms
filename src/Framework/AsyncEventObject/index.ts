export default class _AsyncEventObject<T extends string> {
    private readonly _event = new EventTarget();

    /**
     * Signals all waiting threads.
     * @param event Name of the event to signal
     */
    signal(event: T): void {
        this._event.dispatchEvent(new Event(event));
    }

    /**
     * Waits for the event to be signaled.
     * @param event Name of the event to wait
     * @param timeout Optional. Timeout in milliseconds.
     * If the object is not signaled in given time throws an error.
     * @returns Awaitable object
     */
    wait(event: T, timeout?: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const successCb = () => {
                this._event.removeEventListener(event, successCb);
                resolve();
            }

            const errorCb = () => {
                reject(new Error('Event object timeout'));
            }

            if (timeout) {
                setTimeout(errorCb, timeout);
            }

            this._event.addEventListener(event, successCb);
        });
    }
}
