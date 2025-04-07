export const header = () => {
  var token;
  const authToken = localStorage.getItem("token");

  if (authToken !== null) {
    token = authToken;
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

export const multipartHeader = () => {
  var token;
  const authToken = localStorage.getItem("token");

  if (authToken !== null) {
    token = authToken;
    return {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "multipart/form-data",
    };
  }
};
