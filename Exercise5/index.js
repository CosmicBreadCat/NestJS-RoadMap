function pipeline(...fns) {
  let f = fns[0];
  for (let index = 1; index < fns.length; index++) {
    const g = fns[index];
    const prev = f;
    f = (x) => g(prev(x));
  }

  return f;
}

function normalizeName(user) {
  if (user !== undefined) {
    return {
      name: user.name
        .split(" ")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" "),
      age: user.age,
      email: user.email,
      salary: user.salary,
    };
  }
}

function filterAdults(user) {
  if (user !== undefined) {
    if (user.age > 18) {
      return {
        name: user.name,
        age: user.age,
        email: user.email,
        salary: user.salary,
      };
    }
  }
}

function maskEmail(user) {
  if (user !== undefined) {
    return {
      name: user.name,
      age: user.age,
      email:
        user.email.slice(0, 3) +
        "***" +
        user.email.slice(user.email.indexOf("@")),
      salary: user.salary,
    };
  }
}

function formatSalary(user) {
  if (user !== undefined) {
    return {
      name: user.name,
      age: user.age,
      email: user.email,
      salary: `$${user.salary}`,
    };
  }
}

const users = [
  {
    name: "john doe 1",
    age: 21,
    email: "1jhndo@example.com",
    salary: 40000,
  },
  {
    name: "john doe 2",
    age: 19,
    email: "2jhndo@example.com",
    salary: 30000,
  },
  {
    name: "john doe 3",
    age: 17,
    email: "3jhndo@example.com",
    salary: 20000,
  },
  {
    name: "john doe 4",
    age: 15,
    email: "4jhndo@example.com",
    salary: 10000,
  },
];

const pipelinedFunc = pipeline(
  normalizeName,
  filterAdults,
  maskEmail,
  formatSalary,
);

console.log(users.map((user) => pipelinedFunc(user)));
