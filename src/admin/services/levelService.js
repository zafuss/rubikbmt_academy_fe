let levels = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  name: `Cấp độ ${index + 1}`,
  description: `Mô tả cho cấp độ ${index + 1}`,
  createDate: `2025-03-${index + 10}`,
  status: index % 2 === 0 ? 1 : 0, // 1: Hoạt động, 0: Không hoạt động
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

export const getLevels = () => {
  return simulateApiCall([...levels]);
};

export const addLevel = (level) => {
  const newLevel = {
    key: levels.length,
    ...level,
    createDate: new Date().toISOString().split("T")[0],
    status: 1, // Mặc định là hoạt động
  };
  levels = [...levels, newLevel];
  return simulateApiCall(newLevel, Math.random() > 0.8);
};

export const updateLevel = (key, updatedLevel) => {
  levels = levels.map((level) =>
    level.key === key ? { ...level, ...updatedLevel } : level
  );
  const updated = levels.find((level) => level.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteLevel = (key) => {
  levels = levels.filter((level) => level.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};

export const updateLevelStatus = (key, newStatus) => {
  levels = levels.map((level) =>
    level.key === key ? { ...level, status: newStatus } : level
  );
  const updated = levels.find((level) => level.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};