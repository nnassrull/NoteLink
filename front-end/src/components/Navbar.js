import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ onCreateTask, showSuccess }) => {
  const handleClick = () => {
    const newTask = {
      title: "New Note",
      content: "Write your content",
    };

    onCreateTask(newTask);
  };

  const handleLogout = () => {
    console.log("Logged out successfully");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="nav-bar">
        <span className="page-title">
          Note
          <span style={{ color: "#ECBB01", fontSize: "larger" }}>Link</span>
        </span>
        <div className="navbar-icons">
          <div className="success-icon-container">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={`success-icon ${showSuccess ? "show" : ""}`}
            />
          </div>
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="get-all-tasks-btn"
            onClick={handleClick}
            style={{ fontSize: "larger" }}
          ></FontAwesomeIcon>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
