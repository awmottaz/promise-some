interface PromiseSomeResult<T, U> {
    results: (T | undefined)[];
    signalResult: U | undefined;
    didExitEarly: boolean;
}
declare function PromiseSome<T, U>(promises: Promise<T>[], signal: Promise<U>): Promise<PromiseSomeResult<T, U>>;
export default PromiseSome;
