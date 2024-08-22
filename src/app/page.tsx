"use client";
import { useContext, useEffect, useState } from "react";
import { Course, CourseContext } from "../providers/context";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const { courses, addCourse, enrolledCourses } = useContext(CourseContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setLoading(true);
    try {
      axios.get("/api/courses").then((res) => {
        const { data } = res.data as { data: Course[] };
        data.forEach((course: Course) => {
          console.log(course);
          if (addCourse) {
            addCourse(course);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [addCourse]);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something went wrong...</>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full h-16 border-b p-4">My Courses</div>
      <div className="grid grid-cols-5 gap-2 p-2">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="relative rounded-lg overflow-hidden shadow h-40"
          >
            <Link href={`/course/${course.id}`}>
              <Image
                src={course.image || ""}
                alt={course.title}
                width={600}
                height={600}
              />
              <div className="absolute bg-white h-20 p-2 bottom-0 w-full">
                <h3 className="font-medium">{course.title}</h3>
              </div>
              {enrolledCourses?.includes(parseInt(course.id)) && (
                <div className="absolute top-2 left-2 text-xs bg-yellow-500 px-2 rounded">
                  Enrolled
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
