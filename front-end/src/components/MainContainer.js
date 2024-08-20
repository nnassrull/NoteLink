import { useState } from "react";
import Sidebar from "./Sidebar";
import TaskContent from "./TaskContent";

const MainContainer = ({ tasks, error, loading, onDeleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(
    tasks && tasks.length > 0
      ? tasks[tasks.length - 1]
      : {
          Title: "Untitled",
          Content: "No Content available",
        }
  ); // State to store the selected task content

  // useEffect(() => {
  //   if (tasks.length > 0) {
  //     setSelectedTask(tasks[tasks.length - 1]);
  //   } else {
  //     setSelectedTask({
  //       title: "First Note",
  //       Content: "Create your first note by tapping on the create task button",
  //     });
  //   }
  // }, [tasks]);

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
      />
      <TaskContent task={selectedTask} />
    </div>
  );
};

export default MainContainer;
