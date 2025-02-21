import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import authContext from "../../context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(authContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/tasks?email=${user.email}`).then((res) => {
        setTasks(res?.data);
      });
    }
  }, [axiosPublic, user?.email]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Create a copy of the tasks array
    const updatedTasks = [...tasks];

    // Remove the task from its original position
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.category = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    // Create a new order array to send to the server
    const reorderedTasks = updatedTasks.map((task, index) => ({
      _id: task._id,
      order: index,
    }));

    await axiosPublic.put(`/tasks/${movedTask._id}`, {
      category: movedTask.category,
    });

    await axiosPublic.put(`/tasks/reorder`, {
      tasks: reorderedTasks,
    });
  };

  return (
    <div className="w-11/12 mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between gap-8">
          {/* for to do */}
          <Droppable droppableId="To-Do">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 mt-8 bg-gray-100 py-4 px-8 min-h-[250px]"
              >
                <h3 className="font-bold text-2xl mb-8 text-amber-400 text-center ">
                  To Do
                </h3>
                {tasks
                  .filter((task) => task.category === "To-Do")
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 my-2 rounded  ${
                            snapshot.isDragging
                              ? "bg-amber-100"
                              : "bg-amber-200"
                          } `}
                        >
                          <h3 className="font-semibold">
                            {index + 1}. {task.title}
                          </h3>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* for in progess */}
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
                {tasks
                  .filter((task) => task.category === "In-Progress")
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 my-2 rounded  text-white ${
                            snapshot.isDragging ? "bg-blue-300" : "bg-blue-500"
                          } `}
                        >
                          <h3 className="font-semibold">
                            {index + 1}. {task.title}
                          </h3>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* for completed */}
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
                {tasks
                  .filter((task) => task.category === "Completed")
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 my-2 rounded  text-white ${
                            snapshot.isDragging
                              ? "bg-green-300"
                              : "bg-green-500"
                          } `}
                        >
                          <h3 className="font-semibold">
                            {index + 1}. {task.title}
                          </h3>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
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
