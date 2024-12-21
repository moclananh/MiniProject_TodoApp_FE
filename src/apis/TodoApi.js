import httpClient from "../libs/axios-custom";

export const TodoApi = {
  getTodos: (filter) => httpClient.get("/todos", { params: filter }),
  createTodo: (data) => httpClient.post("/todos", data),
  updateTodo: (id, data) => httpClient.put(`/todos/${id}`, data),
  deleteTodo: (id) => httpClient.delete(`/todos/${id}`),
  getByUserId: (id, filter) => httpClient.get(`/todos/users/${id}`, { params: filter }),
  getById: (id) => httpClient.get(`/todos/${id}`),
  starTodo: (id) => httpClient.patch(`/todos/${id}/star`),
};
