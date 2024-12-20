import httpClient from "../libs/axios-custom";

export const loginApi = {
  login: (data) => httpClient.post("/users/authenticate", data),
  register: (data) => httpClient.post("/users/register", data),
  getUser: () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  },
};
