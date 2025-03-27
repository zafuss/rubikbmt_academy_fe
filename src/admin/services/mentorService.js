let mentors = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  name: `Giáo viên ${index + 1}`,
  email: `mentor${index + 1}@example.com`,
  expertise: `Chuyên môn ${index + 1}`,
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

export const getMentors = () => {
  return simulateApiCall([...mentors]);
};

export const addMentor = (mentor) => {
  const newMentor = {
    key: mentors.length,
    ...mentor,
    joinDate: new Date().toISOString().split("T")[0],
  };
  mentors = [...mentors, newMentor];
  return simulateApiCall(newMentor, Math.random() > 0.8);
};

export const updateMentor = (key, updatedMentor) => {
  mentors = mentors.map((mentor) =>
    mentor.key === key ? { ...mentor, ...updatedMentor } : mentor
  );
  const updated = mentors.find((mentor) => mentor.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteMentor = (key) => {
  mentors = mentors.filter((mentor) => mentor.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};