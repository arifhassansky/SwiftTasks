import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import authContext from "../../context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import moment from "moment";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(authContext);
  const queryClient = useQueryClient();

  // Fetch tasks using React Query
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosPublic.get(`/tasks?email=${user.email}`);
        return res.data;
      }
      return [];
    },
  });

  // Mutation to update a task's category
  const updateTaskCategory = useMutation({
    mutationFn: async ({ taskId, category }) => {
      await axiosPublic.put(`/tasks/${taskId}`, { category });
    },
    onSuccess: () => {
      // Invalidate the tasks query to refetch data
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Mutation to reorder tasks
  const reorderTasks = useMutation({
    mutationFn: async (reorderedTasks) => {
      await axiosPublic.put(`/tasks/reorder`, { tasks: reorderedTasks });
    },
    onSuccess: () => {
      // Invalidate the tasks query to refetch data
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Handle drag-and-drop events
  const onDragEnd = async (result) => {
    if (!result.destination) return; // If dropped outside a droppable area, do nothing

    const { source, destination } = result;

    // Create a copy of the tasks array
    const updatedTasks = [...tasks];

    // Find the task being moved
    const movedTask = updatedTasks.find(
      (task) => task._id === result.draggableId
    );

    if (!movedTask) return; // If the task is not found, do nothing

    // Update the task's category if it's dropped in a different category
    if (source.droppableId !== destination.droppableId) {
      movedTask.category = destination.droppableId;
    }

    // Remove the task from its original position
    updatedTasks.splice(source.index, 1);

    // Insert the task into the new position
    updatedTasks.splice(destination.index, 0, movedTask);

    // Update the order property of each task
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      order: index, // Update the order based on the new position
    }));

    // Update the local state with the new order
    queryClient.setQueryData(["tasks"], reorderedTasks);

    try {
      // Update the task's category on the server (if it changed)
      if (source.droppableId !== destination.droppableId) {
        await updateTaskCategory.mutateAsync({
          taskId: movedTask._id,
          category: movedTask.category,
        });
      }

      // Update the order of all tasks on the server
      await reorderTasks.mutateAsync(reorderedTasks);
    } catch (error) {
      console.error("Error updating tasks:", error);
    }

    // Create a new order array to send to the server
    const reorderedTask = updatedTasks.map((task, index) => ({
      _id: task._id,
      order: index,
    }));

    await axiosPublic.put(`/tasks/reorder`, {
      tasks: reorderedTask,
    });
  };

  // Helper function to render tasks for a specific category
  const renderTasks = (
    category,
    bgColor,
    draggingBgColor,
    textColor = "text-black"
  ) => {
    return tasks
      .filter((task) => task.category === category)
      .map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`p-4 my-2 rounded ${
                snapshot.isDragging ? draggingBgColor : bgColor
              } ${textColor}`}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {index + 1}. {task.title}
                </h3>
                <h3 className="text-xs">
                  {moment(task.timeStamp).format("MMMM Do YYYY, h:mm")}
                </h3>
              </div>
              <p>{task.description}</p>
            </div>
          )}
        </Draggable>
      ));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div className="w-11/12 mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between gap-8">
          {/* To-Do */}
          <Droppable droppableId="To-Do">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 mt-8 bg-gray-100 py-4 px-8 min-h-[250px]"
              >
                <h3 className="font-bold text-2xl mb-8 text-amber-400 text-center">
                  To Do
                </h3>
                {renderTasks("To-Do", "bg-amber-200", "bg-amber-100")}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* In-Progress */}
          <Droppable droppableId="In-Progress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 mt-8 bg-gray-100 py-4 px-8 min-h-[150px]"
              >
                <h3 className="font-bold text-2xl mb-8 text-primary text-center">
                  In Progress
                </h3>
                {renderTasks(
                  "In-Progress",
                  "bg-blue-500",
                  "bg-blue-300",
                  "text-white"
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Completed */}
          <Droppable droppableId="Completed">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 mt-8 bg-gray-100 py-4 px-8 min-h-[150px]"
              >
                <h3 className="font-bold text-2xl mb-8 text-green-500 text-center">
                  Completed
                </h3>
                {renderTasks(
                  "Completed",
                  "bg-green-500",
                  "bg-green-300",
                  "text-white"
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
