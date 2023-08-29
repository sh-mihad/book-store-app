import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
