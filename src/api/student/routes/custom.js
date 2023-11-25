// api/student/config/routes.js

module.exports = {
    routes: [
      {
        method: "GET",
        path: "/students/byCollege/:collegeId",
        handler: "student.getStudentsByCollege"
      }
    ],
};