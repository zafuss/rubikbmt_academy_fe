let subjects = Array.from({ length: 5 }, (_, index) => ({
  key: index,
  name: `Bộ môn ${index + 1}`,
  description: `Mô tả bộ môn ${index + 1}`,
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

export const getSubjects = () => {
  return simulateApiCall([...subjects]);
};

export const addSubject = (subject) => {
  const newSubject = {
    key: subjects.length,
    ...subject,
  };
  subjects = [...subjects, newSubject];
  return simulateApiCall(newSubject, Math.random() > 0.8);
};

export const updateSubject = (key, updatedSubject) => {
  subjects = subjects.map((subject) =>
    subject.key === key ? { ...subject, ...updatedSubject } : subject
  );
  const updated = subjects.find((subject) => subject.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteSubject = (key) => {
  subjects = subjects.filter((subject) => subject.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};