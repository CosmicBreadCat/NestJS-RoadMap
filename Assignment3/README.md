### Functional Metrics Engine

takes in an array of events where elements must contain 3 fields: type, userID and duration.

like:

```js
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
```

Examples of the function:

#### filterByType

```js
filterByType(events1, "login");
```

```json
[
  { "type": "login", "userId": 1, "duration": 120 },
  { "type": "login", "userId": 2, "duration": 80 },
  { "type": "login", "userId": 1, "duration": 100 }
]
```

---

#### getUniqueUserIDs

```js
getUniqueUserIDs(events1);
```

```json
[1, 2]
```

---

#### getAverageDuration

```js
getAverageDuration(events1);
```

```json
124
```

---

#### groupEventsByType

```js
groupEventsByType(events1);
```

```json
{
  "login": [
    { "type": "login", "userId": 1, "duration": 120 },
    { "type": "login", "userId": 2, "duration": 80 },
    { "type": "login", "userId": 1, "duration": 100 }
  ],
  "logout": [{ "type": "logout", "userId": 1, "duration": 20 }],
  "purchase": [{ "type": "purchase", "userId": 2, "duration": 300 }]
}
```

---

#### singleEvenListExecutor

```js
singleEvenListExecutor(getAverageDuration, events1);
```

```json
124
```

---

#### multiEventListExecutor

```js
multiEventListExecutor(getAverageDuration, events1, events2);
```

```json
[124, 109]
```

---

#### mergeEventLists

```js
mergeEventLists(events1, events2);
```

```json
[
  { "type": "login", "userId": 1, "duration": 120 },
  { "type": "logout", "userId": 1, "duration": 20 },
  { "type": "login", "userId": 2, "duration": 80 },
  { "type": "purchase", "userId": 2, "duration": 300 },
  { "type": "login", "userId": 1, "duration": 100 },
  { "type": "login", "userId": 3, "duration": 45 },
  { "type": "logout", "userId": 2, "duration": 200 },
  { "type": "purchase", "userId": 1, "duration": 60 },
  { "type": "login", "userId": 2, "duration": 150 },
  { "type": "purchase", "userId": 3, "duration": 90 }
]
```

---

#### Notes:

- Assumed each one of the requirements was a seperate function.
