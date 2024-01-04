import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Home/Homepage.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import LoginPage from "./components/login/Login.jsx";
import RegisterPage from "./components/register/RegisterPage.jsx";
import { UserContextProvider } from "./userContext.jsx";
import { CreatePost } from "./components/CreateBlog/createPost.jsx";
import  SingleBlog  from "./components/singleBlog/singleBlog.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Homepage />, errorElement: <ErrorPage /> },
  { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "/register", element: <RegisterPage />, errorElement: <ErrorPage /> },
  { path: "/create", element: <CreatePost />, errorElement: <ErrorPage /> },
  {
    path: "/api/blogs/:id",
    element: <SingleBlog />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
