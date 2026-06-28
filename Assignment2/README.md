Simple object validator and cleaner

takes in a users array like for example:

```JS
const users = [
  {
    id: 1,
    name: "Sara",
    email: "sara@example.com",
    age: "25",
    roles: "admin,user",
    score: "88",
  },
  {
    id: 2,
    name: "Omar",
    email: "omar@example.com",
    age: "22",
    roles: "user",
    score: "70",
  },
  {
    id: 3,
    name: "Ali",
    email: "ali@example.com",
    age: "30",
    roles: "editor,user",
    score: "91",
  },
  {
    id: 4,
    name: "Lina",
    email: "lina@example.com",
    age: "28",
    roles: "user",
    score: "95",
  },
];
```

and outputs an object that follows this syntax:

```JSON
{
  "cleanedUsers": [
    {
      "id": 4,
      "name": "lina",
      "email": "lina@example.com",
      "age": 28,
      "roles": [
        "user"
      ],
      "score": 95
    },
    {
      "id": 3,
      "name": "ali",
      "email": "ali@example.com",
      "age": 30,
      "roles": [
        "editor",
        "user"
      ],
      "score": 91
    },
    {
      "id": 1,
      "name": "sara",
      "email": "sara@example.com",
      "age": 25,
      "roles": [
        "admin",
        "user"
      ],
      "score": 88
    },
    {
      "id": 2,
      "name": "omar",
      "email": "omar@example.com",
      "age": 22,
      "roles": [
        "user"
      ],
      "score": 70
    }
  ],
  "removedUsers": [],
  "topUsers": [
    {
      "id": 4,
      "name": "lina",
      "email": "lina@example.com",
      "age": 28,
      "roles": [
        "user"
      ],
      "score": 95
    },
    {
      "id": 3,
      "name": "ali",
      "email": "ali@example.com",
      "age": 30,
      "roles": [
        "editor",
        "user"
      ],
      "score": 91
    },
    {
      "id": 1,
      "name": "sara",
      "email": "sara@example.com",
      "age": 25,
      "roles": [
        "admin",
        "user"
      ],
      "score": 88
    }
  ],
  "validEmails": "sara@example.com, omar@example.com, ali@example.com, lina@example.com"
}
```

Notes:

- Used a Set for checking duplicate emails since it works like a hashtable under the hood for faster lookup times.
- Assumed "Sort valid users by score from highest to lowest." means for both cleaned users and top users so i just sorted cleaned users in place and took the first three elements.
- Mutated the user in place because its honestly just easier than taking a copy and i don't think having the rejected user objects be fully intact matters much when you can see where the error is (will be an undefined or NaN field for the most part). I just didn't think it was worth the space complexity.
