const Navbar = ({ onCreateTask }) => {
  const handleClick = () => {
    const newTask = {
      title: "New Note",
      content: "Write your content",
    };

    onCreateTask(newTask);
  };

  return (
    <>
      <nav className="nav-bar">
        <span className="page-title">
          Note
          <span style={{ color: "#ECBB01", fontSize: "larger" }}>Link</span>
        </span>
        <button className="get-all-tasks-btn" onClick={handleClick}>
          Create Task
        </button>
      </nav>
    </>
  );
};

export default Navbar;
