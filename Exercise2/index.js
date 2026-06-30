function studentGradeFilter(students) {
  const summary = { passing: [], failing: [], average: 0 };

  [summary.passing, summary.failing, summary.average] = students.reduce(
    (acc, student) => {
      if (student.grade >= 60) {
        acc[0].push(student);
      } else {
        acc[1].push(student);
      }
      acc[2] += student.grade;
      return acc;
    },
    [[], [], 0],
  );

  summary.average /= students.length;
  return summary;
}

let students = [
  { name: "John1", grade: 100 },
  { name: "John2", grade: 90 },
  { name: "John3", grade: 80 },
  { name: "John4", grade: 70 },
  { name: "John5", grade: 60 },
  { name: "John6", grade: 50 },
  { name: "John7", grade: 40 },
  { name: "John8", grade: 30 },
  { name: "John9", grade: 20 },
  { name: "John10", grade: 10 },
];

console.log(studentGradeFilter(students));
