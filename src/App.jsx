import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoPage from "./pages/TodoPage";
import { PrivateRoute } from "./components/PrivateRoutes";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",

          element: (
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
