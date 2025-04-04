let cubeSkills = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  name: `Kỹ năng ${index + 1}`,
  description: `Mô tả cho kỹ năng ${index + 1}`,
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

export const getCubeSkills = () => {
  return simulateApiCall([...cubeSkills]);
};

export const addCubeSkill = (skill) => {
  const newSkill = {
    key: cubeSkills.length,
    ...skill,
    createDate: new Date().toISOString().split("T")[0],
    status: 1, // Mặc định là hoạt động
  };
  cubeSkills = [...cubeSkills, newSkill];
  return simulateApiCall(newSkill, Math.random() > 0.8);
};

export const updateCubeSkill = (key, updatedSkill) => {
  cubeSkills = cubeSkills.map((skill) =>
    skill.key === key ? { ...skill, ...updatedSkill } : skill
  );
  const updated = cubeSkills.find((skill) => skill.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteCubeSkill = (key) => {
  cubeSkills = cubeSkills.filter((skill) => skill.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};

export const updateCubeSkillStatus = (key, newStatus) => {
  cubeSkills = cubeSkills.map((skill) =>
    skill.key === key ? { ...skill, status: newStatus } : skill
  );
  const updated = cubeSkills.find((skill) => skill.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};