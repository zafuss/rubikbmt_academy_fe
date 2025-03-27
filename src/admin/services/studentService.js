let students = Array.from({ length: 10 }, (_, index) => ({
  key: index,
  name: `Học viên ${index + 1}`,
  email: `student${index + 1}@example.com`,
  class: `Lớp ${Math.floor(index / 2) + 1}`,
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

export const getStudents = () => {
  return simulateApiCall([...students]);
};

export const addStudent = (student) => {
  const newStudent = {
    key: students.length,
    ...student,
    joinDate: new Date().toISOString().split("T")[0],
  };
  students = [...students, newStudent];
  return simulateApiCall(newStudent, Math.random() > 0.8);
};

export const updateStudent = (key, updatedStudent) => {
  students = students.map((student) =>
    student.key === key ? { ...student, ...updatedStudent } : student
  );
  const updated = students.find((student) => student.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteStudent = (key) => {
  students = students.filter((student) => student.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};