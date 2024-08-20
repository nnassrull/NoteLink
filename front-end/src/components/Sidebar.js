import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ tasks, onSelectedTask, onDeleteTask }) => {
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
            className={`task ${i === selectedIndex ? "task-selected" : ""}`}
            onClick={() => handleClick(task, i)}
          >
            <p>
              <p style={{ fontWeight: "bolder" }}>{task.Title}</p> Lorem ipsum
              dolor sit amet consectetur
            </p>
            <FontAwesomeIcon
              id={`${i === selectedIndex ? "icon-selected" : "icon-disabled"}`}
              icon={faTrashCan}
              onClick={() => onDeleteTask(task.ID)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
