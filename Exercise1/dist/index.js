"use strict";
function createUser(data) {
    var _a, _b, _c, _d, _e;
    return {
        id: (_a = data.id) !== null && _a !== void 0 ? _a : Math.floor(Math.random() * 1000),
        name: (_b = data.name) !== null && _b !== void 0 ? _b : "John Doe",
        email: (_c = data.email) !== null && _c !== void 0 ? _c : "no-reply@example.com",
        age: (_d = data.age) !== null && _d !== void 0 ? _d : Math.floor(Math.random() * 100),
        role: (_e = data.role) !== null && _e !== void 0 ? _e : "viewer",
    };
}
function updateUser(user, updates) {
    return Object.assign(Object.assign({}, user), updates);
}
function getUsersByRole(users, role) {
    return users.filter((user) => user.role === role);
}
const newUser = createUser({ name: "Alice", email: "alice@example.com" });
console.log(newUser);
const updatedUser = updateUser(newUser, { role: "admin" });
console.log(updatedUser);
const admins = getUsersByRole([newUser, updatedUser], "admin");
console.log(admins);
