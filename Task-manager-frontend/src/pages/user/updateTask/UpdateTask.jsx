import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { closeModal } from "../../../redux/modalSlice";
import Swal from "sweetalert2";
import { update } from "../../../services/services";
import "../addTask/AddTask.css";
import { updateTaskApi } from "../../../services/apiEndpoints";

const UpdateTask = () => {
  const dispatch = useDispatch();
  const { isModalOpen, modalType, selectedTask } = useSelector(
    (state) => state.modal
  );
  if (!isModalOpen || modalType !== "UPDATE_TASK") return null;

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "TODO",
    dueDate: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setTaskDetails({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        status: selectedTask.status || "TODO",
        dueDate: selectedTask.dueDate?.split("T")[0] || "",
      });
    }
  }, [selectedTask]);

  const handleInputChange = (e) => {
    setTaskDetails({
      ...taskDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description, status, dueDate } = taskDetails;

    if (!title || !status || !dueDate) {
      Swal.fire({
        title: "Validation Error",
        text: "All fields are required!",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await update(
        `${updateTaskApi}/${selectedTask._id}`,
        taskDetails
      );

      if (response && response.data && response.data.success) {
        Swal.fire({
          title: "Updated",
          text: response.data.message || "Task updated successfully!",
          icon: "success",
        });

        dispatch(closeModal());
      }
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update task. Try again.",
        icon: "error",
      });
    } finally {
      dispatch(closeModal());
    }
  };

  return (
    <div className="add-task-page">
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Update Task</h5>
              <button className="close" onClick={() => dispatch(closeModal())}>
                <FaTimes size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskDetails.title}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={taskDetails.description}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={taskDetails.status}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={taskDetails.dueDate}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => dispatch(closeModal())}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTask;
