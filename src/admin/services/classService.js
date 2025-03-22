let classes = Array.from({ length: 8 }, (_, index) => ({
  key: index,
  name: `Lớp ${index + 1}`,
  teacher: `Giáo viên ${index + 1}`,
  students: Math.floor(Math.random() * 20) + 5,
  startDate: `2025-03-${index + 10}`,
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

export const getClasses = () => {
  return simulateApiCall([...classes]);
};

export const addClass = (classItem) => {
  const newClass = {
    key: classes.length,
    ...classItem,
    startDate: new Date().toISOString().split("T")[0],
  };
  classes = [...classes, newClass];
  return simulateApiCall(newClass, Math.random() > 0.8);
};

export const updateClass = (key, updatedClass) => {
  classes = classes.map((classItem) =>
    classItem.key === key ? { ...classItem, ...updatedClass } : classItem
  );
  const updated = classes.find((classItem) => classItem.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteClass = (key) => {
  classes = classes.filter((classItem) => classItem.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};
