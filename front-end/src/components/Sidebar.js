import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";

const Sidebar = ({ tasks, onSelectedTask, onDeleteTask }) => {
  const [selectedIndex, setSelectedIndex] = useState(tasks.length - 1);

  const handleClick = (task, index) => {
    setSelectedIndex(index);
    onSelectedTask(task);
  };

  // const getFirstWords = (content, wordCount) => {
  //   const words = content.split(" ");
  //   return words.length > wordCount
  //     ? words.slice(0, wordCount).join(" ") + "..."
  //     : content;
  // };

  const getContentPreview = (content) => {
    return content.length > 20 ? content.substring(0, 20) + "..." : content;
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
            <div>
              <FontAwesomeIcon
                icon={faNoteSticky}
                id={`${
                  i === selectedIndex ? "note-selected" : "note-disabled"
                }`}
              />
              <p>
                <p style={{ fontWeight: "bolder" }}>{task.Title}</p>
                {getContentPreview(task.Content)}
              </p>
            </div>
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
