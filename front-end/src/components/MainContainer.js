import { useState } from "react";
import Sidebar from "./Sidebar";
import TaskContent from "./TaskContent";

const MainContainer = ({
  tasks,
  setTasks,
  error,
  loading,
  onDeleteTask,
  onUpdateSuccess,
}) => {
  const [selectedTask, setSelectedTask] = useState(
    tasks && tasks.length > 0
      ? tasks[tasks.length - 1]
      : {
          Title: "Untitled",
          Content: "No Content available",
        }
  ); // State to store the selected task content

  const updateTaskInList = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.ID === id ? { ...task, ...updatedTask } : task
      )
    );

    if (selectedTask.ID === id) {
      setSelectedTask({ ...selectedTask, ...updatedTask });
    }
  };

  console.log(tasks);

  const handleSelected = (task) => {
    setSelectedTask(task);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return <div className="error">Error Loading Tasks: {error.message}</div>;

  return (
    <div className="main">
      <Sidebar
        tasks={tasks}
        onSelectedTask={handleSelected}
        onDeleteTask={onDeleteTask}
        updateTaskInList={updateTaskInList}
      />
      <TaskContent
        task={selectedTask}
        updateTaskInList={updateTaskInList}
        tasks={tasks}
        setTasks={setTasks}
        onUpdateSuccess={onUpdateSuccess}
      />
    </div>
  );
};

export default MainContainer;
