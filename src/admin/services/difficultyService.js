let difficulties = Array.from({ length: 5 }, (_, index) => ({
  key: index,
  name: `Độ khó ${index + 1}`,
  description: `Mô tả độ khó ${index + 1}`,
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

export const getDifficulties = () => {
  return simulateApiCall([...difficulties]);
};

export const addDifficulty = (difficulty) => {
  const newDifficulty = {
    key: difficulties.length,
    ...difficulty,
  };
  difficulties = [...difficulties, newDifficulty];
  return simulateApiCall(newDifficulty, Math.random() > 0.8);
};

export const updateDifficulty = (key, updatedDifficulty) => {
  difficulties = difficulties.map((difficulty) =>
    difficulty.key === key ? { ...difficulty, ...updatedDifficulty } : difficulty
  );
  const updated = difficulties.find((difficulty) => difficulty.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteDifficulty = (key) => {
  difficulties = difficulties.filter((difficulty) => difficulty.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};