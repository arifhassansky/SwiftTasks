import { useContext, useState } from "react";
import authContext from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(authContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      timeStamp: Date.now(),
      email: user?.email,
      category: "To-Do",
    };
    const { data } = await axiosPublic.post("/add-task", taskData);

    if (data?.insertedId) {
      navigate("/");
      toast.success("Task added successfully");
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex items-center justify-center mt-6 lg:mt-12 mb-28">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add a New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title (max 50 characters)"
              maxLength={50}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {title.length}/50 characters
            </p>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Enter task description (max 200 characters)"
              maxLength={200}
            />
            <p className="text-sm text-gray-500 mt-1">
              {description.length}/200 characters
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
