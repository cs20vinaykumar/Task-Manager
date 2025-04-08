import React, { useEffect, useRef, useState } from "react";
import { getAll, remove } from "../../../services/services";
import { getAllTasksApi, deleteTaskApi } from "../../../services/apiEndpoints";
import "./Home.css";
import { openModal } from "../../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import UpdateTask from "../updateTask/UpdateTask";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const searchTerm = useSelector((state) => state.search.term);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (filterStatus === "ALL") return true;

      if (filterStatus === "COMPLETED") return task.status === "COMPLETED";
      if (filterStatus === "In PROGRESS") return task.status === "IN_PROGRESS";
      if (filterStatus === "DUE") {
        return (
          dueDate.toDateString() === tomorrow.toDateString() &&
          task.status !== "COMPLETED"
        );
      }
      return true;
    });

  const handleOpenModal = (task) => {
    dispatch(openModal({ type: "UPDATE_TASK", task }));
  };

  const fetchTasks = async () => {
    try {
      const response = await getAll(getAllTasksApi);
      if (response.success) {
        setTasks(response.data);
      } else {
        console.log("Error fetching tasks:", response.message);
      }
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteTask = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        const response = await remove(`${deleteTaskApi}/${taskId}`);
        if (response.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
          fetchTasks();
        } else {
          Swal.fire({
            title: "Error",
            text: response.message || "Failed to delete task. Try again.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "Failed to delete task. Try again.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isModalOpen]);

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilterStatus("ALL")}>All</button>
        <button onClick={() => setFilterStatus("COMPLETED")}>Completed</button>
        <button onClick={() => setFilterStatus("In PROGRESS")}>
          In Progress
        </button>
        <button onClick={() => setFilterStatus("DUE")}>Due Tomorrow</button>
      </div>
      <div className="tasks">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <span className="task-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
              <div className="task-actions">
                <button
                  className="icon-btn update-btn"
                  onClick={() => handleOpenModal(task)}
                  title="Edit Task"
                >
                  <FaEdit />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => handleDeleteTask(task._id)}
                  title="Delete Task"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No matching tasks found.</p>
        )}
      </div>
      {isModalOpen && <UpdateTask />}
    </div>
  );
};

export default Home;
