interface PromiseSomeResult<T, U> {
  results: (T | undefined)[];
  earlyExitResult: U | undefined;
  didExitEarly: boolean;
}

async function PromiseSome<T, U>(
  promises: Promise<T>[],
  signal: Promise<U>
): Promise<PromiseSomeResult<T, U>> {
  const results: (T | undefined)[] = new Array(promises.length);
  let earlyExitResult: U | undefined = undefined;

  const earlyExitToken = Symbol("PromiseSome early exit");
  const exitPromise = signal.then((result) => {
    earlyExitResult = result;
    return earlyExitToken;
  });

  const allPromise = Promise.all(
    promises.map((p, idx) => {
      return p.then((result) => {
        results[idx] = result;
        return;
      });
    })
  );

  const result = await Promise.race([exitPromise, allPromise]);

  return { results, earlyExitResult, didExitEarly: result === earlyExitToken };
}

export default PromiseSome;
