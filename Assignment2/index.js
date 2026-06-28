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

function cleanUsers(users) {
  const output = {
    cleanedUsers: [],
    removedUsers: [],
    topUsers: [],
    validEmails: "",
  };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const existingEmails = new Set();
  for (const index in users) {
    const user = users[index];

    // Validation and mutation
    try {
      const requiredFields = ["id", "name", "age", "score", "roles", "email"];
      for (const field of requiredFields) {
        if (user[field] == null) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      if (typeof user.id !== "number" || isNaN(user.id)) {
        throw new Error("ID must be a valid number");
      }

      if (typeof user.name !== "string") {
        throw new Error("Name must be a string");
      }

      const age = +user.age;
      const score = +user.score;
      if (isNaN(age)) throw new Error("Age must be a valid number");
      if (isNaN(score)) throw new Error("Score must be a valid number");

      if (typeof user.roles !== "string") {
        throw new Error("Roles must be a string");
      }

      if (typeof user.email !== "string" || !regex.test(user.email)) {
        throw new Error("Invalid email");
      }

      user.name = user.name.toLowerCase();
      user.age = age;
      user.score = score;
      user.roles = user.roles.split(",").map((role) => role.trim());
    } catch (error) {
      user.removedReason = `Error in Validation --> ${error}`;
      console.error(error);
      output.removedUsers.push(user);
      continue;
    }

    // Duplicate email check
    if (existingEmails.has(user.email)) {
      user.removedReason = `Duplicate email`;
      output.removedUsers.push(user);
      continue;
    }

    output.cleanedUsers.push(user);
    existingEmails.add(user.email);
  }
  // Spread operator to turn set into array then into a string of emails
  output.validEmails = [...existingEmails].join(", ");

  // Sorts the cleaned users and takes the top 3 into top users
  output.topUsers = output.cleanedUsers
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return output;
}

console.log(JSON.stringify(cleanUsers(users), null, 2));
