import test from "ava";
import PromiseSome from "./index.js";

function timer(delay, result) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay, result);
  });
}

test("PromiseSome returns all data if done before signal", async (t) => {
  const p1 = timer(100, "one");
  const p2 = timer(100, "two");
  const p3 = timer(100, "three");
  const p4 = timer(100, "four");

  const signal = timer(200, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  t.like(result, {
    results: ["one", "two", "three", "four"],
  });
});

test("PromiseSome returns no data if all done after signal", async (t) => {
  const p1 = timer(200, "one");
  const p2 = timer(200, "two");
  const p3 = timer(200, "three");
  const p4 = timer(200, "four");

  const signal = timer(100, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  t.like(result, {
    results: new Array(4),
  });
});

test("PromiseSome returns partial data for promises done before signal", async (t) => {
  const p1 = timer(100, "one");
  const p2 = timer(300, "two");
  const p3 = timer(100, "three");
  const p4 = timer(300, "four");

  const signal = timer(200, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  const expectedResults = new Array(4);
  expectedResults[0] = "one";
  expectedResults[2] = "three";

  t.like(result, {
    results: expectedResults,
  });
});

test("PromiseSome returns signal data if completed before all promises", async (t) => {
  const p1 = timer(100, "one");
  const p2 = timer(100, "two");
  const p3 = timer(100, "three");
  const p4 = timer(300, "four");

  const signal = timer(200, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  t.like(result, {
    signalResult: "signal",
  });
});

test("PromiseSome returns undefined signal data if promises all complete first", async (t) => {
  const p1 = timer(100, "one");
  const p2 = timer(100, "two");
  const p3 = timer(100, "three");
  const p4 = timer(100, "four");

  const signal = timer(200, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  t.like(result, {
    signalResult: undefined,
  });
});

test("PromiseSome returns `true` for `didExitEarly` if the signal promise resolves first", async (t) => {
  const p1 = timer(100, "one");
  const p2 = timer(100, "two");
  const p3 = timer(100, "three");
  const p4 = timer(300, "four");

  const signal = timer(200, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  t.like(result, {
    didExitEarly: true,
  });
});

test("PromiseSome returns `false` for `didExitEarly` if the promises all resolve before signal", async (t) => {
  const p1 = timer(100, "one");
  const p2 = timer(100, "two");
  const p3 = timer(100, "three");
  const p4 = timer(100, "four");

  const signal = timer(200, "signal");

  const result = await PromiseSome([p1, p2, p3, p4], signal);

  t.like(result, {
    didExitEarly: false,
  });
});

test("PromiseSome rejects with same error if one of the promises rejects", async (t) => {
  const p = Promise.reject(new Error("fail"));
  const signal = timer(200, "signal");

  const output = await t.throwsAsync(PromiseSome([p], signal));

  t.assert(output instanceof Error);
  t.is(output.message, "fail");
});

test("PromiseSome rejects with same error if the signal rejects", async (t) => {
  const p = timer(200, "data");
  const signal = Promise.reject(new Error("fail"));

  const output = await t.throwsAsync(PromiseSome([p], signal));

  t.assert(output instanceof Error);
  t.is(output.message, "fail");
});
