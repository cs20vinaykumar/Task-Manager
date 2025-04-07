import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { closeModal } from "../../../redux/modalSlice";
import Swal from "sweetalert2";
import "./AddTask.css";
import { create } from "../../../services/services";
import { createTaskApi } from "../../../services/apiEndpoints";

const AddTask = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  // Form fields state
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "TODO",
    dueDate: "",
  });

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    setTaskDetails({
      ...taskDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (Add Task)
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
      const response = await create(createTaskApi, taskDetails);

      if (response && response.data && response.data.success) {
        Swal.fire({
          title: "Success",
          text: response.data.message || "Task has been added successfully!",
          icon: "success",
          showConfirmButton: true,
        });
        dispatch(closeModal());
        setTaskDetails({
          title: "",
          description: "",
          status: "TO DO",
          dueDate: "",
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Something went wrong, please try again.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="add-task-page">
      <h1>Add New Task</h1>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
              <button
                type="button"
                className="close"
                onClick={() => dispatch(closeModal())}
              >
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
                    placeholder="Task Title"
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
                    placeholder="Task Description"
                  ></textarea>
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
                    <option value="TODO">To DO</option>
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
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Task
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

export default AddTask;
