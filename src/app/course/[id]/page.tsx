"use client";
import { Course, CourseContext } from "@/providers/context";
import Image from "next/image";
import { useContext } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { courses, enrolledCourses, enroll, unenroll } =
    useContext(CourseContext);
  const course: Course[] | undefined = courses?.filter(
    (course) => course.id.toString() === params.id
  );

  if (!course || course?.length < 1) {
    return null;
  }

  const handleEnrolling = (course: Course[]) => {
    if (!enrolledCourses?.includes(parseInt(course[0].id))) {
      console.log("hey");
      if (enroll) {
        enroll(parseInt(course[0].id));
      }
    } else {
      if (unenroll) {
        unenroll(parseInt(course[0].id));
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-2 p-4 bg-gray-100">
      <div className="relative rounded overflow-hidden">
        <Image fill src={course[0].image || ""} alt={course[0].title || ""} />
        <div className="absolute w-full h-full bg-black opacity-30" />
        <h3 className="absolute top-1/2 text-white text-3xl left-1/3">
          {course[0].title}
        </h3>
      </div>
      <div className="flex flex-col w-full h-full space-y-2">
        <div className="flex-1 bg-white rounded p-4">
          <h3 className="font-bold uppercase">{course[0].title}</h3>
          <p>{course[0].description}</p>
        </div>
        <button
          onClick={() => handleEnrolling(course)}
          className={`p-4 ${
            enrolledCourses?.includes(parseInt(course[0].id))
              ? "bg-green-500"
              : "bg-blue-500"
          } text-white w-full rounded text-lg`}
        >
          {enrolledCourses?.includes(parseInt(course[0].id))
            ? "Already Enrolled"
            : "Enroll"}
        </button>
      </div>
    </div>
  );
}
