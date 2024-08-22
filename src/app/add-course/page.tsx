"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { Course, CourseContext } from "../../providers/context";
import { nanoid } from "nanoid";

const schema = yup.object({
  title: yup.string().min(3, "Must be atleast 3 characters.").required(),
  description: yup.string().min(3, "Must be atleast 3 characters.").required(),
  image: yup.string().optional(),
});

type AddCourseProps = {
  title: string;
  description: string;
  image?: string;
};
const AddCourse = () => {
  const { addCourse } = useContext(CourseContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCourseProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: AddCourseProps) => {
    const course: Course = {
      id: nanoid(),
      title: data.title,
      description: data.description,
    };
    if (addCourse) {
      addCourse(course);
    }
    reset();
  };

  return (
    <div className="flex flex-col p-4">
      <h3>Add Course</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 mt-4"
      >
        <input
          placeholder="Title"
          className="border p-2 rounded"
          {...register("title")}
        />
        <p className="text-xs text-red-400">{errors?.title?.message}</p>
        <input
          placeholder="Description"
          className="border p-2 rounded"
          {...register("description")}
        />
        <p className="text-xs text-red-400">{errors?.description?.message}</p>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};
export default AddCourse;
