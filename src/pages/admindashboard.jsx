import { useEffect, useState } from "react";
import api from "../api";
import logo from "../assets/unsaid.png";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const startEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDueDate(task.dueDate);
  };

  const updateTask = async () => {
    if (!editId) return;
    try {
      await api.put(`/tasks/${editId}`, { title, dueDate });
      setEditId(null);
      setTitle("");
      setDueDate("");
      loadTasks();
    } catch (err) {
      alert(err?.response?.data?.error || "Update failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10" />
        <button
          className="bg-red-600 px-3 py-1 rounded"
          onClick={() => {
            localStorage.clear();
            window.location = "/login";
          }}
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {editId && (
          <div className="bg-white p-4 rounded mb-6 flex gap-3">
            <input
              className="flex-1 border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              className="border p-2 rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 rounded"
              onClick={updateTask}
            >
              Update
            </button>
          </div>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded mb-3 flex justify-between"
          >
            <div>
              <b>{task.title}</b>
              <p className="text-sm text-gray-500">
                {task.user?.name} | {task.dueDate}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => startEdit(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
