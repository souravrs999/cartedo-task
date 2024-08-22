"use client";
import { createContext, ReactNode, useCallback, useState } from "react";

export interface CourseContextProps {
  courses: Course[];
  enrolledCourses: number[];
  addCourse: (x: Course) => void;
  enroll: (x: number) => void;
  unenroll: (x: number) => void;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export const CourseContext = createContext<Partial<CourseContextProps>>({});

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  console.log(enrolledCourses);

  const enroll = (id: number) => {
    setEnrolledCourses([...enrolledCourses, id]);
  };

  const unenroll = (id: number) => {
    setEnrolledCourses(enrolledCourses.filter((courseId) => courseId !== id));
  };

  const addCourse = useCallback((course: Course) => {
    setCourses((prevCourses) => {
      const courseExists = prevCourses.some(
        (existingCourse) => existingCourse.id === course.id
      );
      if (!courseExists) {
        return [...prevCourses, course];
      }
      return prevCourses;
    });
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrolledCourses,
        addCourse,
        enroll,
        unenroll,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
export default ContextProvider;
