interface PromiseSomeResult<T, U> {
    results: (T | undefined)[];
    earlyExitResult: U | undefined;
    didExitEarly: boolean;
}
declare function PromiseSome<T, U>(promises: Promise<T>[], signal: Promise<U>): Promise<PromiseSomeResult<T, U>>;
export default PromiseSome;
