import axios from "axios";
import Swal from "sweetalert2";

const authToken = localStorage.getItem("authToken") || null;

export const create = async (url, postData) => {
  console.log("Request URL:", url);

  // Check Internet Connection
  if (!navigator.onLine) {
    Swal.fire({
      title: "No Internet",
      text: "Please check your connection.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
    });

    return {
      success: false,
      message: "No internet connection",
      statusCode: 401,
    };
  }

  try {
    const response = await axios.post(url, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Success response handling
    Swal.fire({
      title: "Success!",
      text: response.data.message || "Request successful.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    let errorMessage = "Something went wrong!";

    const errorData = error?.response?.data;

    // Handle MongoDB duplicate key error (code 11000)
    if (
      errorData?.message?.code === 11000 ||
      errorData?.message?.errorResponse?.code === 11000
    ) {
      const duplicateField = Object.keys(
        errorData?.message?.keyPattern || {}
      )[0];

      errorMessage = `${duplicateField} already exists. Please use a different one.`;
    } else if (typeof errorData?.message === "string") {
      errorMessage = errorData.message;
    }

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      showConfirmButton: true,
    });

    return {
      success: false,
      message: errorMessage,
      statusCode: error.response?.status || 500,
    };
  }
};

export const getAll = async (url) => {
  if (!navigator.onLine) {
    Swal.fire({
      title: "No Internet",
      text: "Please check your connection.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
    });

    return {
      success: false,
      message: "No internet connection",
    };
  }

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errorMessage =
      error.response?.data?.message || "Something went wrong!";

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      showConfirmButton: true,
    });

    return {
      success: false,
      message: errorMessage,
      statusCode: error.response?.status || 500,
    };
  }
};

export const update = async (url, updateData) => {
  if (!navigator.onLine) {
    Swal.fire({
      title: "No Internet",
      text: "Please check your connection.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
    });

    return {
      success: false,
      message: "No internet connection",
      statusCode: 401,
    };
  }

  try {
    const response = await axios.put(url, updateData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    Swal.fire({
      title: "Success!",
      text: response.data.message || "Updated successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    let errorMessage = "Update failed!";
    const errorData = error?.response?.data;

    // Handle MongoDB duplicate key error (code 11000)
    if (
      errorData?.message?.code === 11000 ||
      errorData?.message?.errorResponse?.code === 11000
    ) {
      const duplicateField = Object.keys(
        errorData?.message?.keyPattern || {}
      )[0];

      errorMessage = `${duplicateField} already exists. Please use a different one.`;
    } else if (typeof errorData?.message === "string") {
      errorMessage = errorData.message;
    }

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      showConfirmButton: true,
    });

    return {
      success: false,
      message: errorMessage,
      statusCode: error.response?.status || 500,
    };
  }
};

export const remove = async (url) => {
  if (!navigator.onLine) {
    Swal.fire({
      title: "No Internet",
      text: "Please check your connection.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
    });

    return {
      success: false,
      message: "No internet connection",
      statusCode: 401,
    };
  }

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    Swal.fire({
      title: "Deleted!",
      text: response.data.message || "Deleted successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    const errorMessage = error.response?.data?.message || "Delete failed!";

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      showConfirmButton: true,
    });

    return {
      success: false,
      message: errorMessage,
      statusCode: error.response?.status || 500,
    };
  }
};
