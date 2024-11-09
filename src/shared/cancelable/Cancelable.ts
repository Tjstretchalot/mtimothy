export type Cancelable<T> = {
    /** The promise that will resolve once the value is available */
    promise: Promise<T>;
    /** A function which can be used to poll the state of the promise */
    done: () => boolean;
    /** A function */
    cancel: () => void;
}