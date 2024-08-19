import { useEffect, useState } from "react";
import "./App.css";
import MainContainer from "./components/MainContainer";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (newTask) => {
    try {
      const response = await axios.post("/tasks", newTask, {
        headers: { "Content-type": "application/json" },
      });
      console.log(response.data);
      fetchTasks(); // Refetch tasks after creation
    } catch (err) {
      setError(err);
      console.error("Error: ", err);
    }
  };

  return (
    <div className="App">
      <Navbar onCreateTask={handleCreateTask} />
      <MainContainer tasks={tasks} error={error} loading={loading} />
    </div>
  );
}

export default App;
