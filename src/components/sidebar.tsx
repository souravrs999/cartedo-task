import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white w-64 border-r p-4 space-y-4">
      <Link href="/">Courses</Link>
      <Link href="/add-course">Add Course</Link>
    </div>
  );
};
export default Sidebar;
