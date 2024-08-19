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
            className={`task ${i === selectedIndex ? "selected" : ""}`}
            onClick={() => handleClick(task, i)}
          >
            <p>
              <p>{task.Title}</p> <br /> Lorem ipsum dolor sit amet consectetur
            </p>
            <FontAwesomeIcon
              className="icons"
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
