let courses = Array.from({ length: 5 }, (_, index) => ({
  key: index,
  name: `Khóa học ${index + 1}`,
  description: `Mô tả khóa học ${index + 1}`,
  startDate: `2025-03-${index + 10}`,
  endDate: `2025-04-${index + 10}`,
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

export const getCourses = () => {
  return simulateApiCall([...courses]);
};

export const addCourse = (course) => {
  const newCourse = {
    key: courses.length,
    ...course,
    startDate: course.startDate || new Date().toISOString().split("T")[0],
    endDate: course.endDate || new Date().toISOString().split("T")[0],
  };
  courses = [...courses, newCourse];
  return simulateApiCall(newCourse, Math.random() > 0.8);
};

export const updateCourse = (key, updatedCourse) => {
  courses = courses.map((course) =>
    course.key === key ? { ...course, ...updatedCourse } : course
  );
  const updated = courses.find((course) => course.key === key);
  return simulateApiCall(updated, Math.random() > 0.8);
};

export const deleteCourse = (key) => {
  courses = courses.filter((course) => course.key !== key);
  return simulateApiCall(null, Math.random() > 0.8);
};