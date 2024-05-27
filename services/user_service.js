const dataSource = [
  {
    id: 1,
    username: "user1",
    email: "user1@gmail.com",
  },
  {
    id: 2,
    username: "user2",
    email: "user2@gmail.com",
  },
  {
    id: 3,
    username: "user3",
    email: "user3@gmail.com",
  },
];

dataSource._maxIndex = Math.max(...dataSource.map((item) => item.id));

// get all users
function getUserList() {
  return [...dataSource];
}

// get user by id
function getUserById(userId) {
  const userItem = dataSource.find(({ id }) => id === userId);
  if (!userItem) {
    throw new Error("User does not exist");
  }

  return userItem;
}

//create user
function createUser(metadata) {
  dataSource._maxIndex += 1;

  const newUserItem = {
    id: dataSource._maxIndex,
    ...metadata,
  };

  dataSource.push(newUserItem);
  return newUserItem;
}

//delete user by id
function deleteUserById(userId) {
  const elemIndex = dataSource.findIndex((item) => item.id === userId);
  if (elemIndex < 0) {
    throw new Error("User does not exist");
  }

  dataSource.splice(elemIndex, 1);
}

module.exports = {
  getUserList,
  getUserById,
  createUser,
  deleteUserById,
};
