import axios from "axios";
import { useEffect, useState } from "react";

const TaskContent = ({
  task,
  updateTaskInList,
  setTasks,
  tasks,
  onUpdateSuccess,
}) => {
  const [taskState, setTaskState] = useState({
    Title: task.Title,
    Content: task.Content,
  });

  useEffect(() => {
    setTaskState({
      Title: task.Title,
      Content: task.Content,
    });
  }, [task]);

  const handleTitleChange = (e) => {
    setTaskState((prevState) => ({
      ...prevState,
      Title: e.target.value,
    }));

    const updatedTasks = tasks.map((t) =>
      t.ID === task.ID ? { ...t, Title: e.target.value } : t
    );
    setTasks(updatedTasks);
  };

  const handleContentChange = (e) => {
    setTaskState((prevState) => ({
      ...prevState,
      Content: e.target.value,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const updateTask = async () => {
        try {
          const response = await axios.put(`/tasks/${task.ID}`, taskState, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(response.data);
          onUpdateSuccess(); // Trigger the success icon

          //Update task in the list
          updateTaskInList(task.ID, taskState);
        } catch (err) {
          console.error("Error updating the task: ", err);
        }
      };

      updateTask();
    }, 3000);

    return () => clearTimeout(timer);
  }, [taskState, task.ID, updateTaskInList, onUpdateSuccess]);

  return (
    <div className="task-content">
      <textarea
        className="task-title-textarea"
        value={taskState.Title}
        onChange={handleTitleChange}
        cols={2}
        style={{
          width: "98%",
          // height: "5vh",
          border: "none",
          resize: "none",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      />
      <textarea
        className="task-content-textarea"
        value={taskState.Content}
        onChange={handleContentChange}
        rows={20}
        cols={20}
        style={{
          width: "98%",
          height: "84vh",
          border: "none",
          resize: "none",
        }}
      />
    </div>
  );
};

export default TaskContent;
