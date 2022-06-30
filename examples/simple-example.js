import PromiseSome from "../index.js";

function timer(delay, result) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay, result);
  });
}

// Returns a random number of milliseconds between 50 and 1050.
function randomMS() {
  return Math.floor(Math.random() * 1000) + 50;
}

(async () => {
  const [time1, time2, time3] = [randomMS(), randomMS(), randomMS()];

  console.table({ time1, time2, time3 });

  const apiCall1 = timer(time1, "data one");
  const apiCall2 = timer(time2, "data two");
  const apiCall3 = timer(time3, "data three");

  const signal = timer(500, true);

  const {
    results: [data1, data2, data3],
    didExitEarly,
  } = await PromiseSome([apiCall1, apiCall2, apiCall3], signal);

  console.table({
    data1,
    data2,
    data3,
    didExitEarly,
  });
})();
