function findUserByName(name, allUsers) {
  return allUsers.find((user) => user.username === name);
}

export { findUserByName };
