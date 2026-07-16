interface UserProfile {
  id: number;
  name: string;
  email: string;
  age: number;
  role: Role;
}

type Role = "admin" | "editor" | "viewer";

function createUser(data: Partial<UserProfile>): UserProfile {
  return {
    id: data.id ?? Math.floor(Math.random() * 1000),
    name: data.name ?? "John Doe",
    email: data.email ?? "no-reply@example.com",
    age: data.age ?? Math.floor(Math.random() * 100),
    role: data.role ?? "viewer",
  };
}

function updateUser(
  user: UserProfile,
  updates: Partial<UserProfile>,
): UserProfile {
  return {
    ...user,
    ...updates,
  };
}

function getUsersByRole(users: UserProfile[], role: Role): UserProfile[] {
  return users.filter((user) => user.role === role);
}

const newUser = createUser({ name: "Alice", email: "alice@example.com" });
console.log(newUser);
const updatedUser = updateUser(newUser, { role: "admin" });
console.log(updatedUser);
const admins = getUsersByRole([newUser, updatedUser], "admin");
console.log(admins);
