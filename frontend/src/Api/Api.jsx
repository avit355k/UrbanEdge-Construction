//frontend/src/Api/Api.jsx
export const API = "http://localhost:8000/api";

export const imageURL = "http://localhost:8000/uploads/services/";

export const projectImageURL = "http://localhost:8000/uploads/projects/";

export const articleImageURL = "http://localhost:8000/uploads/Articles/";

export const teamImageURL = "http://localhost:8000/uploads/members/";

export const token = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) return null;

  const data = JSON.parse(userInfo);
  return data?.token;
};


 
