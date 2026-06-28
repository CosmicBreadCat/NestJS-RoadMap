const events1 = [
  { type: "login", userId: 1, duration: 120 },
  { type: "logout", userId: 1, duration: 20 },
  { type: "login", userId: 2, duration: 80 },
  { type: "purchase", userId: 2, duration: 300 },
  { type: "login", userId: 1, duration: 100 },
];

const events2 = [
  { type: "login", userId: 3, duration: 45 },
  { type: "logout", userId: 2, duration: 200 },
  { type: "purchase", userId: 1, duration: 60 },
  { type: "login", userId: 2, duration: 150 },
  { type: "purchase", userId: 3, duration: 90 },
];

function filterByType(events, type) {
  const output = [];
  for (const event of events) {
    if (event.type === type) {
      output.push(event);
    }
  }
  return output;
}

function getUniqueUserIDs(events) {
  const output = new Set();
  for (const event of events) {
    if (!output.has(event.userId)) {
      output.add(event.userId);
    }
  }
  return [...output];
}

function getAverageDuration(events) {
  let output = 0,
    count = 0;
  for (const event of events) {
    count += 1;
    output += event.duration;
  }
  return output / count;
}

function groupEventsByType(events) {
  const output = {};
  for (const event of events) {
    if (!output[event.type]) {
      output[event.type] = [];
    }
    output[event.type].push(event);
  }
  return output;
}

function singleEvenListExecutor(func, events) {
  return func(events);
}

function multiEventListExecutor(func, ...eventLists) {
  const output = [];
  for (const events of eventLists) {
    output.push(func(events));
  }
  return output;
}

function mergeEventLists(...eventLists) {
  const output = [];
  for (const events of eventLists) {
    output.push(...events);
  }
  return output;
}
