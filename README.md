The `PromiseSome` utility allows you to race a list of promises against one "signal" promise. If any of your promises resolve before the signal resolves, then you will receive that data. The rest remain `undefined`.

## Quick start

Using `PromiseSome` is similar to using `Promise.all`, except that you add a second argument for the "signal" promise. `PromiseSome` will resolve in one of the following scenarios:

- Every promise in the array resolves before the signal promise resolves. Then the `results` array is the same as if you just ran `Promise.all`.
- The `signal` promise resolves before all of the other promises have resolved. Then the `results` array is a sparse array containing the results of those promises that did resolve before the `signal` resolved.

```js
import PromiseSome from "@awmottaz/promise-some";

async function fetchSomeData() {
  // Only wait 500ms for the fetches to resolve.
  const signal = new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  // The `results` array is populated with the results of
  // all of the promises that were able to resolve before
  // the `signal` promise resolved, in the same order of
  //
  const {
    results: [fooData, barData, bazData],
  } = PromiseSome([fetchFoo, fetchBar, fetchBaz], signal);

  return {
    fooData,
    barData,
    bazData,
  };
}
```

See the `examples` folder with more examples. You can run these yourself with `node`!

## API and documentation

- See `index.d.ts` for the API of `PromiseSome`.
- See the `examples` folder for examples of `PromiseSome` in action.
- See `test.js` for more nuanced usage and test cases.

## Support and bug reporting

- [View already reported issues](https://github.com/awmottaz/promise-some/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)
- [Create a new issue](https://github.com/awmottaz/promise-some/issues/new/choose)

## Developing

To setup your local environment, clone this repo and run `npm install`.

To compile the code and run tests in watch mode, run `npm run compile-and-test`.

To compile the TypeScript source into `.js` and `.d.ts` files, run `npm run compile`, or `npm run compile-watch` to compile in watch mode.

To run the tests, run `npm run test`,or `npm run test-watch` to run in watch mode. Note that tests run against the **compiled** output (`index.js`), _not_ the TypeScript source. The `compile-and-test` script handles this for you, but the `test` and `test-watch` scripts do not.

## Contributing

Thanks for your interest in contributing to this repository!

The steps for contributing are:

1. Fork this repository.
2. Follow the [Developing](#developing) section above.
3. Make your changes in the fork.
4. Add or update tests as needed to cover the change.
5. Update the [CHANGELOG](./CHANGELOG.md) file with your changes.
6. Commit your changes.
7. Open a Pull Request.

### Commit message style

Commit messages are for maintainers of this package, _not_ end users. If the change does affect the end users, then you should include a note of the change in the [CHANGELOG](./CHANGELOG.md) as part of the commit.

Keep commits atomic, and be sure to include plenty of context for the change as needed.

The first line of the commit should answer the question, "What changes if I apply this commit?".

The body of the commit message can be used to add context, nuance, and color to the first line summary.

If this commit resolves an issue, include the issue number in the footer of the commit message by writing, `Closes #123`.
