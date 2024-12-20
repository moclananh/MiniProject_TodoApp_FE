import httpClient from "../libs/axios-custom";

export const TodoApi = {
  getTodos: (filter) => httpClient.get("/todo", { params: filter }),
  createTodo: (data) => httpClient.post("/todo", data),
  updateTodo: (id, data) => httpClient.put(`/todo/${id}`, data),
  deleteTodo: (id) => httpClient.delete(`/todo/${id}`),
  getByUserId: (id, filter) => httpClient.get(`/Todo/GetToDosByUserId/${id}`, { params: filter }),
  getById: (id) => httpClient.get(`/todo/${id}`),
};
