import { useState } from "react";

const Sidebar = ({ tasks, onSelectedTask }) => {
  const [selectedIndex, setSelectedIndex] = useState(tasks.length - 1);

  const handleClick = (task, index) => {
    setSelectedIndex(index);
    onSelectedTask(task);
  };

  return (
    <div className="side-bar">
      <ul>
        {tasks.map((task, i) => (
          <li
            key={i}
            id={i === selectedIndex ? "selected" : ""}
            className={`task ${i === selectedIndex ? "selected" : ""}`}
            onClick={() => handleClick(task, i)}
          >
            <p>{task.Title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
