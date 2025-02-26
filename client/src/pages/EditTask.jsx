import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import authContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditTask = () => {
  const { user } = useContext(authContext);
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  //   fetching task data
  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/tasks?email=${user.email}`).then((res) => {
        setTasks(res?.data);
      });
    }
  }, [axiosPublic, user?.email]);

  //   update function
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask) return;

    const { data } = await axiosPublic.put(`/update-task/${selectedTask._id}`, {
      title: updatedTitle,
      description: updatedDescription,
    });

    if (data.modifiedCount > 0) {
      toast.success("Task updated successfully");

      // Update local state to reflect changes in UI
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id
            ? { ...task, title: updatedTitle, description: updatedDescription }
            : task
        )
      );
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure delete your task?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleDelete(id);
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  //   function for delete task
  const handleDelete = async (id) => {
    const { data } = await axiosPublic.delete(`/delete-task/${id}`);

    if (data.deletedCount > 0) {
      const filteredItems = tasks.filter((task) => task._id !== id);
      setTasks(filteredItems);
      toast.success("Task deleted successfully");
    }
  };

  return (
    <div className="w-11/12 mx-auto mb-28">
      {/* Heading */}
      <h3 className="py-8 text-2xl md:text-3xl lg:text-4xl text-center font-semibold">
        Edit Your Task
      </h3>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <div key={task._id} className="p-4 my-2 rounded bg-yellow-200">
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {index + 1}. {task.title}
              </h3>
              <div className="flex gap-4">
                {/* Delete Button */}
                <button
                  className="cursor-pointer text-red-500"
                  onClick={() => confirmDelete(task._id)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>

                {/* Edit Button */}
                <button
                  className="cursor-pointer text-green-500"
                  onClick={() => handleEditClick(task)}
                >
                  <FaEdit size={20} />
                </button>
              </div>
            </div>
            <p>{task.description}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-blue-50 p-6 rounded-lg w-[60%] sm:w-[80%] lg:w-[600px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-primary">
              Update Your Task
            </h2>
            {/* Title Input */}
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            {/* Description Textarea */}
            <textarea
              className="w-full p-2 border rounded"
              rows="5"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            ></textarea>
            {/* Modal Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="btn bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateTask}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTask;
