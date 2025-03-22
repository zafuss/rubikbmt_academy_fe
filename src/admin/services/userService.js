let users = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  name: `Người dùng ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 2 === 0 ? "Admin" : "Giáo viên",
  joinDate: `2025-03-${index + 10}`,
}));

const simulateApiCall = (data, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Lỗi giả lập từ API"));
      } else {
        resolve(data);
      }
    }, 1000);
  });
};

export const getUsers = () => {
  return simulateApiCall([...users]);
};

export const addUser = (user) => {
  const newUser = {
    key: users.length,
    ...user,
    joinDate: new Date().toISOString().split("T")[0],
  };
  users = [...users, newUser];
  return simulateApiCall(newUser, Math.random() > 0.8);
};

export const updateUser = (key, updatedUser) => {
  users = users.map((user) =>
    user.key === key ? { ...user, ...updatedUser } : user
  );
  const updated = users.find((user) => user.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteUser = (key) => {
  users = users.filter((user) => user.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};
