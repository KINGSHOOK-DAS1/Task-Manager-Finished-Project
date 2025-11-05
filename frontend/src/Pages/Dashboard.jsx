import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Search,
  PlusCircle,
  CheckCircle,
  ClipboardList,
  Clock,
  Edit,
  Trash2,
  Bell,
} from "lucide-react";

const priorities = ["Low", "Medium", "High"];
const API_URL = "https://task-manager-finished-project-w57q.vercel.app/api/tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [timeLeft, setTimeLeft] = useState({});
  const [reminders, setReminders] = useState({});
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true); // 🆕 Added state

  // 🟢 Fetch tasks
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        if (res.data.result === "success") {
          const formattedTasks = res.data.data.map((task) => ({
            ...task,
            id: task._id,
          }));
          setTasks(formattedTasks);
        }
      })
      .catch(console.error);
  }, []);

  // 🕒 Timer updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updated = {};
      tasks.forEach((task) => {
        if (task.dueDate) {
          const diff = new Date(task.dueDate).getTime() - now;
          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            updated[task.id] = `${days}d ${hours}h ${minutes}m`;
          } else {
            updated[task.id] = "Overdue!";
          }
        }
      });
      setTimeLeft(updated);
    }, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  // 📊 Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, completed, pending: total - completed };
  }, [tasks]);

  // 🔍 Filter & sort
  const filteredTasks = useMemo(() => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return tasks
      .filter((task) =>
        filter === "completed"
          ? task.completed
          : filter === "pending"
          ? !task.completed
          : true
      )
      .filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return aTime - bTime;
      });
  }, [tasks, filter, search]);

  // ➕ Add Task
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return alert("Task title is required");
    try {
      const res = await axios.post(`${API_URL}/createTask`, {
        ...newTask,
        completed: false,
      });
      if (res.data.result === "success") {
        setTasks([{ ...res.data.data, id: res.data.data._id }, ...tasks]);
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Complete toggle
  const handleToggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        ...task,
        completed: !task.completed,
      });
      if (res.data.result === "success") {
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...res.data.data, id: res.data.data._id } : t
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.data.result === "success") {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Edit
  const handleEditStart = (task) => {
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
  };

  const handleEditSave = async () => {
    if (!editTask.title.trim()) return alert("Task title is required");
    try {
      const res = await axios.put(`${API_URL}/${editTask.id}`, { ...editTask });
      if (res.data.result === "success") {
        setTasks(
          tasks.map((task) =>
            task.id === editTask.id ? { ...task, ...editTask } : task
          )
        );
        setEditTask({
          id: null,
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCancel = () =>
    setEditTask({
      id: null,
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
    });

  // 🔔 Reminder setup
  const handleSetReminder = (taskId, minutes) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task?.dueDate) return alert("Set a due date first!");
    const dueTime = new Date(task.dueDate).getTime();
    const reminderTime = dueTime - minutes * 60000;
    const now = new Date().getTime();

    if (reminderTime <= now)
      return alert("Reminder time must be before due date!");

    setReminders({
      ...reminders,
      [taskId]: {
        minutes,
        enabled: true,
      },
    });

    setTimeout(() => {
      alert(`⏰ Reminder: Task "${task.title}" is due soon!`);
    }, reminderTime - now);
  };

  // 📅 Calendar highlighting
  const getTileContent = ({ date }) => {
    const dayTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate).toDateString() === date.toDateString()
    );

    if (dayTasks.length === 0) return null;

    return (
      <div className="flex justify-center gap-1 mt-1">
        {dayTasks.map((task, index) => {
          const color =
            task.priority === "High"
              ? "border-red-500"
              : task.priority === "Medium"
              ? "border-yellow-500"
              : "border-green-500";
          return (
            <span
              key={index}
              className={`h-3 w-3 rounded-full border-2 ${color} ${
                task.completed ? "bg-gray-400 line-through" : ""
              }`}
            ></span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen mt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <ClipboardList className="text-indigo-600" size={30} /> Task Dashboard
        </h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="search"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button
            onClick={handleAddTask}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            <PlusCircle className="mr-2" size={18} /> Add Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white flex items-center justify-center gap-3 px-6 py-6 rounded-xl shadow-lg border-l-4 border-indigo-600">
          <ClipboardList className="text-indigo-600" size={28} />
          <span className="text-lg font-semibold text-gray-800">
            Total: {stats.total}
          </span>
        </div>
        <div className="bg-white flex items-center justify-center gap-3 px-6 py-6 rounded-xl shadow-lg border-l-4 border-green-600">
          <CheckCircle className="text-green-600" size={28} />
          <span className="text-lg font-semibold text-gray-800">
            Completed: {stats.completed}
          </span>
        </div>
        <div className="bg-white flex items-center justify-center gap-3 px-6 py-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
          <Clock className="text-yellow-500" size={28} />
          <span className="text-lg font-semibold text-gray-800">
            Pending: {stats.pending}
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 mb-10 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="text-indigo-600" size={22} /> Task Calendar
          </h2>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition text-sm"
          >
            {showCalendar ? "Hide Calendar" : "Show Calendar"}
          </button>
        </div>

        {showCalendar && (
          <Calendar
            onChange={setCalendarDate}
            value={calendarDate}
            tileContent={getTileContent}
          />
        )}
      </div>

      {/* Add Task */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
          <PlusCircle className="text-indigo-600" size={22} /> Add New Task
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title *"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Description (optional)"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            rows={3}
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="date"
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <select
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddTask}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow"
            >
              <PlusCircle className="inline-block mr-2" size={18} /> Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-3">
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-lg shadow ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.length === 0 && (
          <li className="text-center text-gray-500">No tasks found.</li>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`bg-white p-5 rounded-xl border border-gray-200 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all ${
              task.completed ? "opacity-70 line-through" : "hover:shadow-lg"
            }`}
          >
            <div className="flex items-start gap-4 flex-grow">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                className="h-5 w-5 mt-1 accent-indigo-600"
              />
              <div className="flex flex-col w-full">
                {editTask.id === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTask.title}
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                      className="border rounded px-2 py-1 mb-2 w-full focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                      value={editTask.description}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1 mb-2 w-full focus:ring-2 focus:ring-indigo-500"
                      rows={2}
                    />
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-lg text-gray-900">
                      {task.title}
                    </div>
                    {task.description && (
                      <div className="text-gray-600 text-sm">
                        {task.description}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {editTask.id === task.id ? (
                <>
                  <input
                    type="date"
                    value={editTask.dueDate}
                    onChange={(e) =>
                      setEditTask({ ...editTask, dueDate: e.target.value })
                    }
                    className="border rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={editTask.priority}
                    onChange={(e) =>
                      setEditTask({ ...editTask, priority: e.target.value })
                    }
                    className="border rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleEditSave}
                    className="flex items-center bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition shadow"
                  >
                    <CheckCircle size={16} className="mr-1" /> Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="flex items-center bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition shadow"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {task.dueDate && (
                    <div className="text-sm text-gray-500">
                      ⏰{" "}
                      {new Date(task.dueDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      {" | "}
                      <span
                        className={`font-medium ${
                          timeLeft[task.id] === "Overdue!"
                            ? "text-red-500"
                            : "text-gray-700"
                        }`}
                      >
                        {timeLeft[task.id] || ""}
                      </span>
                    </div>
                  )}
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleEditStart(task)}
                    className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition shadow"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="flex items-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition shadow"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => handleSetReminder(task.id, 30)}
                    className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition shadow"
                  >
                    <Bell size={16} className="mr-1" /> Reminder 30m
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
