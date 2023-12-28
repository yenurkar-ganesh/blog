import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Home/Homepage.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import LoginPage from "./components/login/Login.jsx";
import RegisterPage from "./components/register/RegisterPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Homepage />, errorElement: <ErrorPage /> },
  { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "/register", element: <RegisterPage />, errorElement: <ErrorPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
