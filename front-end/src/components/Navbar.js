import { useState } from "react";

const Navbar = ({ onCreateTask }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newtask = {
      title: title,
      content: content,
    };

    onCreateTask(newtask);
    setTitle("");
    setContent("");
  };

  const handleCancel = (e) => {
    e.preventDefault();

    handleClick();
  };

  return (
    <>
      <nav className="nav-bar">
        <span className="page-title">
          To
          <span style={{ color: "#ECBB01" }}>DoList</span>
        </span>
        <button className="get-all-tasks-btn" onClick={handleClick}>
          Create Task
        </button>
      </nav>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="content">Content: </label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button>add Task</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      )}
    </>
  );
};

export default Navbar;
