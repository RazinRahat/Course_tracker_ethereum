// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Course_tracker {

    // model a course
   struct Course {
        string courseName;
        uint gpa;
    }

    // model a semester
    struct Semester {
        string semesterName;
        Course[] courses;
    }

    //model a student
    struct Student {
        uint studentId;
        mapping(string => Semester) semesters;
    }

    // read/write students
    mapping(uint => Student) public students;

    // store courses count
    uint public coursesCount;

    // events
    event CourseAddedEvent(uint indexed studentId, string semesterName, string courseName, uint gpa);
    event CoursesRetrievedEvent(uint indexed studentId, string semesterName, Course[] courses);
    event CGPARetrievedEvent(uint indexed studentId, string semesterName, uint cgpa);

    // Constructor
    // constructor() {
    //     addCourse(20101001, "Spring2020", "CSE110", 4);
    //     addCourse(20101006, "Spring2020", "ENG101", 4);
    // }

    // add course to semester of students
    function addCourse(uint _studentId, string memory _semesterName, string memory _courseName, uint _gpa) public {
        students[_studentId].studentId = _studentId;
        students[_studentId].semesters[_semesterName].semesterName = _semesterName;
        students[_studentId].semesters[_semesterName].courses.push(Course(_courseName, _gpa));

        coursesCount++;
        
        emit CourseAddedEvent(_studentId, _semesterName, _courseName, _gpa);
    }

    function getCGPA(uint _studentId, string memory _semesterName) public returns (uint) {
        uint totalGPA = 0;
        Course[] memory courses = students[_studentId].semesters[_semesterName].courses;
        for (uint i = 0; i < courses.length; i++) {
            totalGPA += courses[i].gpa;
        }
        uint cgpa = totalGPA / courses.length;
        
        emit CGPARetrievedEvent(_studentId, _semesterName, cgpa);
        
        return cgpa;
    }

    function getCourses(uint _studentId, string memory _semesterName) public returns (Course[] memory) {
        Course[] memory courses = students[_studentId].semesters[_semesterName].courses;
        
        emit CoursesRetrievedEvent(_studentId, _semesterName, courses);
        
        return courses;
    }

}